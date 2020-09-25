import babel from 'rollup-plugin-babel'
export default {
  input: './vue.js',
  output: [{
    file: './dist/vue-sim.js',
    format: 'umd',
    name:'Vue'
  }, {
    file: './dist/vue-sim.esm.js',
    format: 'es'
  }],
  plugins: [
    babel({
      exclude: '**/node_modules/**'
    })
  ]
}
