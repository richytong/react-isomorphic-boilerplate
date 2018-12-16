import React from 'react'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import Waypoint from 'react-waypoint'
import PropTypes from 'prop-types'
import { fetchAnimeData } from '../store'

class TopAnime extends React.Component {
  componentDidMount() {
    if (this.props.topAnimeData.length <= 0) {
      this.props.fetchAnimeData()
    }
  }

  render() {
    const { topAnimeData, nextPage } = this.props

    let waypoint
    if (nextPage !== null) {
      waypoint = (
        <Waypoint onEnter={ () => this.props.fetchAnimeData(nextPage) }>
          <div>Loading more...</div>
        </Waypoint>
      )
    } else {
      waypoint = <p>No more top anime</p>
    }

    const topAnimeList = topAnimeData.map(({ malId, rank, title, imageUrl }, idx) => {
      if (idx === topAnimeData.length - 1) {
        return (
          <li key={ malId }>
            <p>{ rank } | <Link to={`/anime/${malId}`}>{title}</Link></p>
            <img src={ imageUrl } alt={ title } />
            { waypoint }
          </li>
        )
      }
      return (
        <li key={ malId }>
          <p>{ rank } | <Link to={`/anime/${malId}`}>{title}</Link></p>
          <img src={ imageUrl } alt={ title } />
        </li>
      )
    })

    return (
      <div>
        <Helmet>
          <title>Top Anime</title>
          <meta name="description" content="MyAnimeList Top Anime" />
        </Helmet>

        <h2>My Anime List Top Anime</h2>
        <ul>{ topAnimeList }</ul>
      </div>
    )
  }
}

TopAnime.dataFetch = fetchAnimeData

TopAnime.propTypes = {
  topAnimeData: PropTypes.arrayOf(PropTypes.object).isRequired,
  nextPage: PropTypes.number.isRequired,
  fetchAnimeData: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  topAnimeData: state.topAnime.data,
  nextPage: state.topAnime.nextPage,
})

const mapDispatchToProps = {
  fetchAnimeData,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopAnime)
