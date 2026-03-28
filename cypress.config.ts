import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
