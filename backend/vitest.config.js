import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    // Test files start their own database server, so run them one at a time.
    fileParallelism: false,
    // The first run downloads a MongoDB binary.
    hookTimeout: 600_000,
    testTimeout: 30_000,
  },
})
