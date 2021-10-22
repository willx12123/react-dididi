"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProvides = exports.getInstance = exports.instances = void 0;
exports.instances = new Map();
function getInstance(Service) {
    const instance = exports.instances.get(Service);
    if (!instance) {
        throw new Error(`Instance ${Service.toString()} is not provide.`);
    }
    return instance;
}
exports.getInstance = getInstance;
function setProvides(services) {
    services.forEach((service) => createService(service));
}
exports.setProvides = setProvides;
function createService(target) {
    const instance = exports.instances.get(target);
    if (instance) {
        return instance;
    }
    const providers = Reflect.getMetadata("design:paramtypes", target);
    console.log(providers);
    if (!Array.isArray(providers)) {
        throw new Error(`Reflect fail: providers is not an array: ${providers}`);
    }
    if (providers.length === 0) {
        const service = new target();
        exports.instances.set(target, service);
        return service;
    }
    const args = providers.map((provider) => createService(provider));
    const service = new target(...args);
    exports.instances.set(target, service);
    return service;
}
