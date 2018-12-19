import TopAnime from './components/TopAnime'
import AnimeDetail from './components/AnimeDetail'
import NotFound from './components/NotFound'

export default [
  {
    path: '/',
    component: TopAnime,
    exact: true,
  },
  {
    path: '/anime/:malId',
    component: AnimeDetail,
    exact: true,
  },
  {
    path: '*',
    component: NotFound,
  },
]
