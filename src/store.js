import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { topAnimeReducer, animeDetailReducer } from './reducers'

const reducer = combineReducers({
  topAnime: topAnimeReducer,
  animeDetail: animeDetailReducer,
})

export default initialState => createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
