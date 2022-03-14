const autoPreprocess = require('svelte-preprocess')

const warningsToIgnore = [
  'a11y-autofocus',
  'a11y-no-onchange',
  'a11y-missing-attribute',
  'a11y-label-has-associated-control'
]

module.exports = {
  preprocess: autoPreprocess(),
  onwarn: (warning, handler) => {
    if (warningsToIgnore.includes(warning.code)) return
    handler(warning)
  },
}

