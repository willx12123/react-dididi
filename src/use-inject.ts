import { useRef } from "react";

import { getInstance } from "./provide";

export function useInject<T>(Service: { new (...args: any[]): T }): T {
  const instanceRef = useRef<T>();

  if (!instanceRef.current) {
    instanceRef.current = getInstance(Service);
  }

  return instanceRef.current;
}
