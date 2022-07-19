export declare const Flags: {
    IS_LOG: boolean;
    IS_PROFILE: boolean;
};
/** Set a value for the specified global control flags.  */
export declare function setFlag(flag: keyof typeof Flags, value: boolean): void;
export declare const IS_LOG: boolean, IS_PROFILE: boolean;
