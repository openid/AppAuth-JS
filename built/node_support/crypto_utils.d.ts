import { Crypto } from '../crypto_utils';
export declare class NodeCrypto implements Crypto {
    generateRandom(size: number): string;
    deriveChallenge(code: string): Promise<string>;
}
