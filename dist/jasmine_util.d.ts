import { Environment, Features } from './environment';
import { KernelBackend } from './kernels/backend';
export declare function canEmulateEnvironment(emulatedFeatures: Features): boolean;
export declare function anyFeaturesEquivalentToDefault(emulatedFeatures: Features[], environment: Environment): boolean;
export declare function describeWithFlags(name: string, featuresToRun: Features[], tests: () => void): void;
export interface TestBackendFactory {
    name: string;
    factory: () => KernelBackend;
    priority: number;
}
export declare let TEST_BACKENDS: TestBackendFactory[];
export declare function setBeforeAll(f: (features: Features) => void): void;
export declare function setAfterAll(f: (features: Features) => void): void;
export declare function setBeforeEach(f: (features: Features) => void): void;
export declare function setAfterEach(f: (features: Features) => void): void;
export declare function setTestBackends(testBackends: TestBackendFactory[]): void;
export declare function registerTestBackends(): void;
