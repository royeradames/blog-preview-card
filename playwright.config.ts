import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests", workers: 1, use: { baseURL: "http://localhost:4327", channel: "chrome" },
  webServer: { command: "npm run start -- --hostname 127.0.0.1 --port 4327", url: "http://localhost:4327", reuseExistingServer: false },
});
