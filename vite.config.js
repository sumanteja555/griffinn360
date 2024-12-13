import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const ReactCompilerConfig = {
  /* ... */
};

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        },
      }),
    ],
    // ...
  };
});

// import MillionLint from "@million/lint";
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [MillionLint.vite(), react()],
// });
