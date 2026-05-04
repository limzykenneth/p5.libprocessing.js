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
      "p5.libprocessing": "./src/main.js"
    },
    platform: "node",
    dts: true
  },
  run: {
    tasks: {
      build: {
        command: "vp pack"
      },
      check: {
        command: "vp lint"
      }
    }
  }
});
