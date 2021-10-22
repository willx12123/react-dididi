declare type Constructor<T = any> = new (...args: any[]) => T;
export declare const instances: Map<Constructor<any>, object>;
export declare function getInstance<T>(Service: Constructor<T>): T;
export declare function setProvides(services: Array<{
    new (...args: any[]): any;
}>): void;
export {};
