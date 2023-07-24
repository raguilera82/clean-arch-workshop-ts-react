# Clean Architecture Workshop with TypeScript + React

## Steps

### Create scaffolding with vite

```sh
$> npm create vite@latest clean-arch-workshop-ts -- --template react-ts
$> cd clean-arch-workshop-ts
$> npm install
```

### Adding supports to Vitest

Install dependency
```sh
$> npm install -D vitest
```

Update package.json scripts:

```json
...
"scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest"
  },
...
```

Adding support to browser

```sh
$> npm install -D jsdom
```

Create config vite.config.ts

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom'
  }
})

```

Create a dumb test to prove test configuration:

```typescript
//test/first.spec.ts
import {describe, expect, it} from 'vitest';

describe('First test', () => {

    it('should works', () => {
        expect(true).toBe(true);
    })

})
```

Run tests

```sh
$> npm run test
```

