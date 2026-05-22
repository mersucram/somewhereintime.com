import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";
import tailwindcss from "@tailwindcss/vite";

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== ""
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`;

const certificateName = "somewhereintime.com.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(baseFolder)) {
  fs.mkdirSync(baseFolder, { recursive: true });
}

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (
    0 !==
    child_process.spawnSync(
      "dotnet",
      [
        "dev-certs",
        "https",
        "--export-path",
        certFilePath,
        "--format",
        "Pem",
        "--no-password",
      ],
      { stdio: "inherit" },
    ).status
  ) {
    throw new Error("Could not create certificate.");
  }
}

// Default server target used for proxying API calls during dev. Matches the server launchSettings ports.
const target =
  env["services__somewhereintime-com-server__https__0"] ??
  env["services__somewhereintime-com-server__http__0"] ??
  "https://localhost:7141/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    // Bind to IPv4 localhost to avoid permission issues binding to IPv6 ::1 on some systems
    host: env.DEV_SERVER_HOST || "127.0.0.1",
    proxy: {
      "^/weatherforecast": {
        target,
        secure: false,
      },
      "^/Menu": {
        target,
        secure: false,
      },
    },
    // If DEV_SERVER_PORT is provided, Vite will try to use it but not fail hard if it
    // cannot bind (avoids EACCES causing the process to exit). When the requested
    // port is unavailable or permission is denied Vite will attempt other ports.
    port: parseInt(env.DEV_SERVER_PORT || "5173"),
    strictPort: false,
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath),
    },
  },
});
