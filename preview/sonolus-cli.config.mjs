import { resolve } from 'node:path'
/** @type {import('@sonolus/sonolus.js').SonolusCLIConfig} */
export default {
    type: 'preview',
    async esbuild(options) {
        return {
            ...options,
            plugins: [
                {
                    name: 'ts-paths',
                    setup(build) {
                        build.onResolve(
                            {
                                filter: /^~(lib)?\/.*/,
                            },
                            async (args) => {
                                const path = args.path.startsWith('~lib/')
                                    ? './lib/' + args.path.slice(5).replace('.cjs', '.cts')
                                    : './play/src/' + args.path.slice(2).replace('.mjs', '.mts')

                                return {
                                    path: resolve(process.cwd(), path),
                                }
                            }
                        )
                    },
                },
                ...options.plugins,
            ],
        }
    },
}