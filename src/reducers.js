export const topAnimeReducer = (state = { data: [], nextPage: 1 }, action) => {
  switch (action.type) {
    case 'FETCH_TOP_ANIME_DATA': return {
      data: action.data,
      nextPage: state.nextPage + 1,
    }
    case 'FETCH_MORE_TOP_ANIME_DATA': {
      const malIdSet = new Set()
      const dedupedTopAnime = [...state.data, ...action.data].filter(({ malId }) => {
        if (malIdSet.has(malId)) { return false }
        malIdSet.add(malId)
        return true
      })

      return {
        data: dedupedTopAnime,
        nextPage: state.nextPage + 1,
      }
    }
    case 'NO_MORE_TOP_ANIME_DATA': return {
      data: state.data,
      nextPage: null,
    }
    default: return state
  }
}

export const animeDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_ANIME_DETAIL_DATA': return action.data
    case 'RESET_ANIME_DETAIL_DATA': return {}
    default: return state
  }
}
