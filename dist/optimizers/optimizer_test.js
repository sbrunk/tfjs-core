"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("..");
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
var sgd_optimizer_1 = require("./sgd_optimizer");
jasmine_util_1.describeWithFlags('optimizer', test_util_1.ALL_ENVS, function () {
    it('basic', function () {
        var learningRate = .1;
        var optimizer = tf.train.sgd(learningRate);
        var x = tf.scalar(4).variable();
        var bias = tf.scalar(1).variable();
        var strayVariable = tf.scalar(-1).variable();
        var numTensors = tf.memory().numTensors;
        var f = function () { return x.square().addStrict(bias); };
        var cost = optimizer.minimize(f, true);
        expect(tf.memory().numTensors).toBe(numTensors + 1);
        var expectedX1 = -2 * 4 * learningRate + 4;
        var expectedBias1 = -1 * learningRate + 1;
        test_util_1.expectArraysClose(x, [expectedX1]);
        test_util_1.expectArraysClose(bias, [expectedBias1]);
        test_util_1.expectArraysClose(cost, [Math.pow(4, 2) + 1]);
        test_util_1.expectArraysClose(strayVariable, [-1]);
        cost.dispose();
        numTensors = tf.memory().numTensors;
        cost = optimizer.minimize(f, false);
        expect(tf.memory().numTensors).toBe(numTensors);
        var expectedX2 = -2 * expectedX1 * learningRate + expectedX1;
        var expectedBias2 = -learningRate + expectedBias1;
        test_util_1.expectArraysClose(x, [expectedX2]);
        test_util_1.expectArraysClose(bias, [expectedBias2]);
        expect(cost).toBe(null);
        test_util_1.expectArraysClose(strayVariable, [-1]);
        optimizer.dispose();
        x.dispose();
        bias.dispose();
        strayVariable.dispose();
        expect(tf.memory().numTensors).toBe(3);
    });
    it('varList array of all variables', function () {
        var learningRate = .1;
        var optimizer = new sgd_optimizer_1.SGDOptimizer(learningRate);
        var x = tf.scalar(4).variable();
        var bias = tf.scalar(1).variable();
        var strayVariable = tf.scalar(-1).variable();
        var varList = [x, bias];
        var f = function () { return x.square().addStrict(bias); };
        var cost = optimizer.minimize(f, true, varList);
        var expectedX1 = -2 * 4 * learningRate + 4;
        var expectedBias1 = -1 * learningRate + 1;
        test_util_1.expectArraysClose(x, [expectedX1]);
        test_util_1.expectArraysClose(bias, [expectedBias1]);
        test_util_1.expectArraysClose(cost, [Math.pow(4, 2) + 1]);
        test_util_1.expectArraysClose(strayVariable, [-1]);
        cost = optimizer.minimize(f, false, varList);
        var expectedX2 = -2 * expectedX1 * learningRate + expectedX1;
        var expectedBias2 = -learningRate + expectedBias1;
        test_util_1.expectArraysClose(x, [expectedX2]);
        test_util_1.expectArraysClose(bias, [expectedBias2]);
        test_util_1.expectArraysClose(strayVariable, [-1]);
        expect(cost).toBe(null);
    });
    it('varList empty array of variables throws error', function () {
        var learningRate = .1;
        var optimizer = new sgd_optimizer_1.SGDOptimizer(learningRate);
        var x = tf.scalar(4).variable();
        var bias = tf.scalar(1).variable();
        tf.scalar(-1).variable();
        var varList = [];
        var f = function () { return x.square().addStrict(bias); };
        expect(function () { return optimizer.minimize(f, true, varList); })
            .toThrowError();
    });
    it('varList subset of variables update', function () {
        var learningRate = .1;
        var optimizer = new sgd_optimizer_1.SGDOptimizer(learningRate);
        var x = tf.scalar(4).variable();
        var bias = tf.scalar(1).variable();
        var strayVariable = tf.scalar(-1).variable();
        var varList = [x];
        var f = function () { return x.square().addStrict(bias); };
        var cost = optimizer.minimize(f, true, varList);
        var expectedValue1 = -2 * 4 * learningRate + 4;
        test_util_1.expectArraysClose(x, [expectedValue1]);
        test_util_1.expectArraysClose(bias, [1]);
        test_util_1.expectArraysClose(cost, [Math.pow(4, 2) + 1]);
        test_util_1.expectArraysClose(strayVariable, [-1]);
        cost = optimizer.minimize(f, false, varList);
        var expectedValue2 = -2 * expectedValue1 * learningRate + expectedValue1;
        test_util_1.expectArraysClose(x, [expectedValue2]);
        test_util_1.expectArraysClose(bias, [1]);
        expect(cost).toBe(null);
        test_util_1.expectArraysClose(strayVariable, [-1]);
    });
    it('only bias trainable', function () {
        var learningRate = .1;
        var optimizer = new sgd_optimizer_1.SGDOptimizer(learningRate);
        var trainable = false;
        var x = tf.scalar(4).variable(trainable);
        var bias = tf.scalar(1).variable();
        var strayVariable = tf.scalar(-1).variable();
        var f = function () { return x.square().addStrict(bias); };
        var cost = optimizer.minimize(f, true);
        test_util_1.expectArraysClose(x, [4]);
        var expectedBias1 = -1 * learningRate + 1;
        test_util_1.expectArraysClose(bias, [expectedBias1]);
        test_util_1.expectArraysClose(cost, [Math.pow(4, 2) + 1]);
        test_util_1.expectArraysClose(strayVariable, [-1]);
        cost = optimizer.minimize(f, false);
        test_util_1.expectArraysClose(x, [4]);
        var expectedBias2 = -learningRate + expectedBias1;
        test_util_1.expectArraysClose(bias, [expectedBias2]);
        expect(cost).toBe(null);
        test_util_1.expectArraysClose(strayVariable, [-1]);
    });
    it('only bias trainable, only x in varList throws error', function () {
        var learningRate = .1;
        var optimizer = new sgd_optimizer_1.SGDOptimizer(learningRate);
        var trainable = false;
        var x = tf.scalar(4).variable(trainable);
        var bias = tf.scalar(1).variable();
        tf.scalar(-1).variable();
        var varList = [x];
        var f = function () { return x.square().addStrict(bias); };
        expect(function () { return optimizer.minimize(f, true, varList); })
            .toThrowError();
    });
    it('throws error when f returns a non-scalar', function () {
        var learningRate = .1;
        var optimizer = new sgd_optimizer_1.SGDOptimizer(learningRate);
        var x = tf.tensor1d([1, 2]).variable();
        var f = function () { return x.square(); };
        expect(function () { return optimizer.minimize(f); }).toThrowError();
    });
});
//# sourceMappingURL=optimizer_test.js.map