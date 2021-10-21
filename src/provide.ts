type ClassType = { new (...args: any[]): object };

const instances = new Map<ClassType, object>();

export function getInstance<T>(Service: { new (...args: any[]): T }): T {
  const instance = instances.get(Service as unknown as ClassType);
  if (!instance) {
    throw new Error(`Instance ${Service.toString()} is not provide.`);
  }

  return instance as unknown as T;
}

export function setProvides(services: Array<{ new (...args: any[]): any }>) {
  services.forEach((service) => createService(service));
}

function createService(target: ClassType): object {
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

  const args = providers.map((provider: ClassType) => createService(provider));
  const service = new target(...args);
  instances.set(target, service);
  return service;
}
