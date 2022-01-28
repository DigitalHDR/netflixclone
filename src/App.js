// src/app.js
import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';

export default () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)

  useEffect(() => {
    const loadAll = async () => {
      //! pegando a lista total
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      //! pegando o Featured
      let originals = list.filter(i=>i.slug === 'originals') //! pega apenas os filme originais do netflix
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let choseInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(choseInfo)
    }

    loadAll()
  }, [])

  return (
    <div className='page'>

      {featuredData && 
        <FeaturedMovie item={featuredData} />
      }

      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  )
}
