import { GPGPUProgram } from './gpgpu_math';
export declare class UnaryOpProgram implements GPGPUProgram {
    variableNames: string[];
    userCode: string;
    outputShape: number[];
    constructor(aShape: number[], opSnippet: string);
}
export declare const ABS = "return abs(x);";
export declare const RELU: string;
export declare const ELU = "return (x >= 0.0) ? x : (exp(x) - 1.0);";
export declare const SELU: string;
export declare function STEP(alpha?: number): string;
export declare const NEG = "return -x;";
export declare const CEIL = "return ceil(x);";
export declare const FLOOR = "return floor(x);";
export declare const SIGN = "\n  if (isNaN(x)) { return 0.0; }\n  return sign(x);\n";
export declare const ROUND = "\n  // OpenGL ES does not support round function.\n  // The algorithm is based on banker's rounding.\n  float base = floor(x);\n  if ((x - base) < 0.5) {\n    return floor(x);\n  } else if ((x - base) > 0.5) {\n    return ceil(x);\n  } else {\n    if (mod(base, 2.0) == 0.0) {\n      return base;\n    } else {\n      return base + 1.0;\n    }\n  }\n";
export declare const EXP = "return exp(x);";
export declare const EXPM1 = "return exp(x) - 1.0;";
export declare const LOG = "return log(x);";
export declare const LOG1P = "return log(1.0 + x);";
export declare const SQRT = "return sqrt(x);";
export declare const RSQRT = "return inversesqrt(x);";
export declare const SIGMOID = "return 1.0 / (1.0 + exp(-1.0 * x));";
export declare const SOFTPLUS = "\n  float epsilon = 1.1920928955078125e-7;\n  float threshold = log(epsilon) + 2.0;\n\n  bool too_large = x > -threshold;\n  bool too_small = x < threshold;\n\n  float result;\n  float exp_x = exp(x);\n\n  if (too_large){\n    result = x;\n  }\n  else if (too_small){\n    result = exp_x;\n  }\n  else{\n    result = log(exp_x + 1.0);\n  }\n  return result;\n";
export declare const SIN = "return sin(x);";
export declare const COS = "return cos(x);";
export declare const TAN = "return tan(x);";
export declare const ASIN = "return asin(x);";
export declare const ACOS = "return acos(x);";
export declare const ATAN: string;
export declare const SINH = "\n  float e2x = exp(x);\n  return (e2x - 1.0 / e2x) / 2.0;\n";
export declare const COSH = "\n  float e2x = exp(-x);\n  return (e2x + 1.0 / e2x) / 2.0;\n";
export declare const TANH = "\n  float e2x = exp(-2.0 * abs(x));\n  return sign(x) * (1.0 - e2x) / (1.0 + e2x);\n";
export declare const ASINH = "return log(x + sqrt(x * x + 1.0));";
export declare const ACOSH = "return log(x + sqrt(x * x - 1.0));";
export declare const ATANH = "return (log(1.0 + x) - log(1.0 - x)) / 2.0;";
export declare const ERF: string;
export declare const SQUARE = "return x * x;";
export declare const RECIPROCAL = "return 1.0 / x;";
export declare const LOGICAL_NOT = "return float(!(x >= 1.0));";
export declare const TO_INT = "return float(int(x));";