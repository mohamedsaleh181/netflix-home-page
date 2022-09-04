import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Nav from '../../components/navbar/Nav';
import './MovieDetails.css'

function MovieDetails() {
//   const API_KEY = 'f1aca93e54807386df3f6972a5c33b50';
// const baseURL = 'https://api.themoviedb.org/3';
const [genres, setgenres] = useState([])
  const params = useParams();
  const [movie, setMovie] = useState(null)
  // const movieURL = `${baseURL}/movie/${params.id}?api_key=${API_KEY}`
  const movieURL = `https://api.themoviedb.org/3/movie/${params.id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`

  const fetchMovieDetails = async ()=>{
    const {data} = await axios.get(movieURL)
    setMovie(data)
  }
  useEffect(() => {
    setgenres(movie?.genres);
  }, [movie])
  useEffect(()=>{
    fetchMovieDetails();
  },[])
  console.log('the movie',movie)
  // const image_url = "https://image.tmdb.org/t/p/original/";

  return (
    <>
      <Nav />
      {/* <div
        className="modal__container"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          width: "100%",
          height: "100vh",
        }}
      >
        <div className='modal__content'>
          <h1 className="modal__title">{movie?.title || movie?.name}</h1>
          <p className="modal__info">
            <span className="modal__rating">
              Rating: {movie?.vote_average * 10}%{" "}
            </span>
            Release date: {movie?.release_date || movie?.first_air_date}{" "}
            Runtime: {movie?.runtime || movie?.episode_run_time}m
          </p>
          <p className="modal__episode">
            {movie?.number_of_episodes
              ? " Episodes: " + movie?.number_of_episodes
              : ""}
            {movie?.number_of_seasons
              ? " Seasons: " + movie?.number_of_seasons
              : ""}
          </p>
          <p className="modal__overview">{movie?.overview}</p>
          <button className="modal__btn modal__btn--red">Play</button>
          <button className="modal__btn">My List</button>
        </div>
        <div className="modal__gradient"></div>
      </div> */}
      <div className="details">
      {movie? <div className="row my-5 g-5 details__content">
        <div className="col-md-4">
            <img className='w-100' src={"https://image.tmdb.org/t/p/w500"+movie?.poster_path} alt="" />
        </div>

        <div className="col-md-8 details">
            <h1 className='pt-4'>{movie?.title}</h1>
            <p className="border-0">{movie?.tagline}</p>
            <div className='genres d-flex flex-wrap'>
              {genres? genres.map((g, index)=>{
                return <div key={index} className='rounded-2 p-1 me-4 mb-2'>{g.name}</div>
              }) : ''}
            </div>
            <h5 className='my-2'>Rate : <span>{movie?.vote_average}</span></h5>
            <h5 className='my-2'>vote_count : <span>{movie?.vote_count}</span></h5>
            <h5 className='my-2'>popularity : <span>{movie?.popularity}</span></h5>
            <h5 className='my-2'>release_date : <span>{movie?.release_date}</span></h5>
            <h5 className='my-2'>production_countries : {movie?.production_countries?<span>{movie?.production_countries[0].name}</span>:''}</h5>
            <h5 className='text-center mt-5'>overview</h5>
            <p className="border-0 mt-1">{movie?.overview}</p>
        </div>
        
      </div> : <div className=" d-flex justify-content-center align-items-center"> <h2><i className='fas fa-spinner fa-spin'></i></h2> </div>}
      </div>
    </>
  );
}

export default MovieDetails