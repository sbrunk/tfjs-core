import { Gradients } from './gradients';
import { Tracking } from './tracking';
export declare const tidy: typeof Tracking.tidy;
export declare const keep: typeof Tracking.keep;
export declare const dispose: typeof Tracking.dispose;
export declare const time: typeof Tracking.time;
export declare const grad: typeof Gradients.grad;
export declare const valueAndGrad: typeof Gradients.valueAndGrad;
export declare const grads: typeof Gradients.grads;
export declare const valueAndGrads: typeof Gradients.valueAndGrads;
export declare const variableGrads: typeof Gradients.variableGrads;
export declare const customGrad: typeof Gradients.customGrad;