const isTest = process.env.NODE_ENV === 'test'

const svelteIgnore = [
  'a11y-autofocus',
  'a11y-missing-attribute',
  'a11y-label-has-associated-control'
]

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: {url: '/', static: true},
    src: {url: '/dist'},
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    ['@snowpack/plugin-run-script',
      {cmd: 'svelte-check --output human --compiler-warnings ' + svelteIgnore.map(i => i + ':ignore').join(','), watch: '$1 --watch', output: 'stream'}
    ],
    [
      '@snowpack/plugin-typescript',
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? {tsc: 'yarn pnpify tsc'} : {}),
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    open: 'none',
    port: isTest ? 8985 : 8080
  },
  buildOptions: {
    sourcemap: true
  },
}
