import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Banner.css'
// import axios from '../../axios'
import requests from '../../Request'
import axios from 'axios'
function Banner() {
    const [movie, setMovie] = useState([])
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length -1)
            ])
            return request
        }
        fetchData()
    },[])
    const truncate = (string , n) => {
        return string?.length > n ? string.slice(0,n) + '....' : string
    }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.name || movie?.title || movie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h2 className="banner__description">{truncate(movie?.overview, 150)}</h2>
      </div>
      <div className="banner__fadBottom"></div>
    </header>
  );
}

export default Banner