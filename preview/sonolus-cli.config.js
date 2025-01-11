import { resolve } from "node:path";
/** @type {import('@sonolus/sonolus.js').SonolusCLIConfig} */
export default {
  type: "preview",
  async esbuild(options) {
    return {
      ...options,
      plugins: [
        {
          name: "ts-paths",
          setup(build) {
            build.onResolve(
              {
                filter: /^~(lib)?\/.*/,
              },
              async (args) => {
                const path = `./play/src/${args.path.slice(2).replace(".js", ".ts")}`;

                return {
                  path: resolve(process.cwd(), path),
                };
              },
            );
          },
        },
        ...options.plugins,
      ],
    };
  },
};
