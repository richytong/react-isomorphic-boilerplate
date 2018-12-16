import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { fetchTopAnime, fetchAnimeDetail } from './api'

// actions and thunks - basically actions but as functions - use in same contract as actions `store.dispatch(action)`
export const fetchAnimeData = (page = 1) => async (dispatch) => {
  const data = await fetchTopAnime(page)

  if (page > 1) {
    return dispatch({ data, type: 'FETCH_MORE_TOP_ANIME_DATA' })
  } else if (data.length === 0) {
    return dispatch({ type: 'NO_MORE_TOP_ANIME_DATA' })
  }
  return dispatch({ data, type: 'FETCH_TOP_ANIME_DATA' })
}

export const fetchAnimeDetailData = ({ malId }) => async (dispatch) => {
  const data = await fetchAnimeDetail(malId)
  return dispatch({ malId, data, type: 'FETCH_ANIME_DETAIL_DATA' })
}

export const resetAnimeDetailData = () => ({ type: 'RESET_ANIME_DETAIL_DATA' })

// reducers
const topAnimeReducer = (state = { data: [], nextPage: 1 }, action) => {
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

const animeDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_ANIME_DETAIL_DATA': return action.data
    case 'RESET_ANIME_DETAIL_DATA': return {}
    default: return state
  }
}

// combine reducers and namespace the redux state
const reducer = combineReducers({
  topAnime: topAnimeReducer,
  animeDetail: animeDetailReducer,
})

export default initialState => createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
