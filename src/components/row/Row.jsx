import React from "react";
import "./Row.css";
import { useEffect } from "react";
import { useState } from "react";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";
import {
  //  useDispatch,
  useSelector,
} from "react-redux";
import {
  // addToFav,
  // removeFromFav,
  // selectFavList,
  selectUser,
} from "../../features/userSlice";

function Row({ title, fetchurl, isLargeRow = false }) {
  const base_url = "https://image.tmdb.org/t/p/original/";
  // const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  // const favList = useSelector(selectFavList);
  const user = useSelector(selectUser);
  const [favMovies, setFavMovies] = useState([]);

  const movieId = doc(db, "users", `${user?.email}`);

  const saveShow = async (movie) => {
    if (user?.email) {
      await updateDoc(movieId, {
        favList: arrayUnion({
          id: movie?.id,
          title: movie?.name || movie?.title || movie?.original_name,
          img: movie?.backdrop_path,
        }),
      });
    } else {
      alert("please login to save a movie");
    }
  };
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setFavMovies(doc.data()?.favList);
    });
  }, [user?.email]);

  const deleteShow = async (movie) => {
    try {
      const result = favMovies.filter((item) => {
        return item.id !== movie.id;
      });
      await updateDoc(movieId, {
        favList: result,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchurl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchurl]);

  // const favMovie = (movie) => {
  //   const fav = favList.some((favMovie) => {
  //     return favMovie.id == movie.id;
  //   });
  //   if (fav) {
  //     dispatch(removeFromFav(movie));
  //   } else {
  //     dispatch(addToFav(movie));
  //   }
  // };

  const check = (movie) => {
    const fav = favMovies.some((favMovie) => {
      return favMovie.id == movie.id;
    });
    return fav;
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          return (isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path) ? (
            // <Link key={movie.id} to={`/details/${movie.id}`}>
              <div
              key={movie.id} className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              >
                <img
                  className="row__poster-image"
                  src={`${base_url}${
                    isLargeRow ? movie?.poster_path : movie?.backdrop_path
                  }`}
                  alt={movie?.name || movie?.title || movie?.original_name}
                />
                <div className="row__poster-overlay">
                  <div className="row__poster-title">
                    {!isLargeRow ? movie?.name : ""}
                  </div>
                  <div>{movie.id}</div>
                </div>
                <MdFavorite
                  onClick={() => {
                    // favMovie(movie);
                    check(movie) ? deleteShow(movie) : saveShow(movie);
                  }}
                  className={`${
                    check(movie) ? "row__poster-liked" : "row__poster-like"
                  }`}
                />
              </div>
            // </Link>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default Row;
