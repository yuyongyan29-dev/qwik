import { beforeAll, expect } from 'vitest';

// This has to run before qdev.ts loads. `beforeAll` is too late
(globalThis as any).qTest = true;
(globalThis as any).qRuntimeQrl = true;
(globalThis as any).qDev = true;
(globalThis as any).qInspector = false;

beforeAll(async () => {
  const { getTestPlatform } = await import('./packages/qwik/src/testing/platform');
  const { setPlatform } = await import('./packages/qwik/src/core/shared/platform/platform');
  setPlatform(getTestPlatform() as any);
  // Core's own tests may import runtime modules without the library layer that registers its QRLs.
  if (expect.getState().testPath?.includes('/packages/qwik/src/')) {
    await import('./packages/qwik/src/core/qwik-lib');
  }
});
