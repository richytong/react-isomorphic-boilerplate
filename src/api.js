import request from 'superagent'

export const fetchTopAnime = async (page) => {
  const res = await request.get(`https://api.jikan.moe/top/anime/${page}`)
  return res.body.top.map(({ rank, title, mal_id, image_url }) => ({
    rank,
    title,
    malId: mal_id,
    imageUrl: image_url,
  }))
}

export const fetchAnimeDetail = async (malId) => {
  const res = await request.get(`https://api.jikan.moe/anime/${malId}`)
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
