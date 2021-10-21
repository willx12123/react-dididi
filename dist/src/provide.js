"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProvides = exports.getInstance = void 0;
const instances = new Map();
function getInstance(Service) {
    const instance = instances.get(Service);
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
    const instance = instances.get(target);
    if (instance) {
        return instance;
    }
    const providers = Reflect.getMetadata("design:paramtypes", target);
    if (!Array.isArray(providers)) {
        throw new Error(`Reflect fail: providers is not an array: ${providers}`);
    }
    if (providers.length === 0) {
        const service = new target();
        instances.set(target, service);
        return service;
    }
    const args = providers.map((provider) => createService(provider));
    const service = new target(...args);
    instances.set(target, service);
    return service;
}
