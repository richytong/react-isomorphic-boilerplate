import request from 'superagent'

const { JIKAN_API_URL } = process.env

export const fetchTopAnime = async (page) => {
  const res = await request.get(`${JIKAN_API_URL}/top/anime/${page}`)
  return res.body.top.map(({ rank, title, mal_id, image_url }) => ({
    rank,
    title,
    malId: mal_id,
    imageUrl: image_url,
  }))
}

export const fetchAnimeDetail = async (malId) => {
  const res = await request.get(`${JIKAN_API_URL}/anime/${malId}`)
  return {
    title: res.body.title,
    episodes: res.body.episodes,
    status: res.body.status,
    synopsis: res.body.synopsis,
    background: res.body.background,
    linkCanonical: res.body.link_canonical,
    imageUrl: res.body.image_url,
    openingThemes: res.body.opening_theme,
    endingThemes: res.body.ending_theme,
    error: res.body.error,
  }
}
