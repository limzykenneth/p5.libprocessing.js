import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix"
  },
  fmt: {
    trailingComma: "none",
    singleQuote: false
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  pack: {
    entry: {
      "p5.libprocessing": "./src/main.ts"
    },
    platform: "node",
    dts: true
  },
  run: {
    tasks: {
      "build:ffi": {
        command: "napi build --platform -o ./ffi/dist",
        env: ["PKG_CONFIG_PATH"],
        input: [{ auto: true }, "!target/**", "!ffi/dist/**"]
      },
      build: {
        command: "vp pack",
        dependsOn: ["build:ffi"]
      },
      "build:release:ffi": {
        command: "napi build --platform --release -o ./ffi/dist",
        env: ["PKG_CONFIG_PATH"],
        input: [{ auto: true }, "!target/**", "!ffi/dist/**"]
      },
      "build:release": {
        command: "vp pack",
        dependsOn: ["build:release:ffi"]
      },
      check: {
        command: "taplo lint && vp lint"
      },
      fmt: {
        command: "cargo fmt && taplo fmt && vp fmt"
      }
    }
  }
});
