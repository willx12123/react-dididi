# react-dididi

A simple DI/IoC lib for react.

## Install

```bash
npm install react-dididi
```

## Use

```ts
import { Injectable } from "react-dididi";

@Injectable()
export class FooService {
  constructor(private readonly barService: BarService) {}

  print() {
    this.barService.name;
  }
}

@Injectable()
export class BarService {
  name = "Andy";
}

```

```ts
// main.ts

import { setProvides } from "react-dididi";

import { FooService, BarService } from "xxxx";

setProvides([FooService, BarService]);

```

```tsx
import { useInject } from "react-dididi";

const xx: React.FC = () => {
  const fooService = useInject(FooService);

  useEffect(() => {
    fooService.print();
  }, []);
};
```
