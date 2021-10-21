export declare function getInstance<T>(Service: {
    new (...args: any[]): T;
}): T;
export declare function setProvides(services: Array<{
    new (...args: any[]): any;
}>): void;
