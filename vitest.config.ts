import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*_spec.ts', 'src/**/*.spec.ts', 'src/**/*_test.ts'],
  },
});
