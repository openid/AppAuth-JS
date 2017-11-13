export declare function bufferToString(buffer: Uint8Array): string;
export interface RandomGenerator {
    (sizeInBytes?: number): string;
}
export declare const generateRandom: RandomGenerator;
