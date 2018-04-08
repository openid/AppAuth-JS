export declare function bufferToString(buffer: Uint8Array): string;
export declare type RandomGenerator = (sizeInBytes?: number) => string;
export declare const cryptoGenerateRandom: RandomGenerator;
