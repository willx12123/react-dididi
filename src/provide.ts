type Constructor<T = any> = new (...args: any[]) => T;

export const instances = new Map<Constructor<any>, object>();

export function getInstance<T>(Service: Constructor<T>): T {
  const instance = instances.get(Service);
  if (!instance) {
    throw new Error(`Instance ${Service.toString()} is not provide.`);
  }

  return instance as unknown as T;
}

export function setProvides(services: Array<{ new (...args: any[]): any }>) {
  services.forEach((service) => createService(service));
}

function createService<T>(target: Constructor<T>): T {
  const instance = instances.get(target);
  if (instance) {
    return instance as unknown as T;
  }

  const providers = Reflect.getMetadata("design:paramtypes", target);
  console.log(providers);
  if (!Array.isArray(providers)) {
    throw new Error(`Reflect fail: providers is not an array: ${providers}`);
  }

  if (providers.length === 0) {
    const service = new target();
    instances.set(target, service as unknown as object);
    return service;
  }

  const args = providers.map((provider: Constructor) => createService(provider));
  const service = new target(...args);
  instances.set(target, service as unknown as object);
  return service;
}
