import { Tensor } from '../tensor';
export declare class SigmoidCrossEntropyOps {
    static sigmoidCrossEntropyWithLogits<T extends Tensor, O extends Tensor>(labels: T, logits: T): O;
}
