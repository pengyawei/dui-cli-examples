import types from './types'

export default {
  setExample ({ commit }, value) {
    commit(types.EXAMPLE, value)
  }
}
