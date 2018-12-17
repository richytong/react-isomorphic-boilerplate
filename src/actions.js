import { fetchTopAnime, fetchAnimeDetail } from './api'

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
