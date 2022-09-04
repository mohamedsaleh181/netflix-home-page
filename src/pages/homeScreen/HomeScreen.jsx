import React from 'react'
import Banner from '../../components/banner/Banner'
import Nav from '../../components/navbar/Nav'
import Row from '../../components/row/Row'
import requests from '../../Request'
import './HomeScreen'
function HomeScreen() {
  return (
    <div className="app">
      {/* Navbar */}
      <Nav />
      {/* Banner */}
      <Banner />
      {/* Rows */}
      <Row
        title="NETFLIX ORIGINAL"
        fetchurl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchurl={requests.fetchTrending} />
      <Row title="Action Movies" fetchurl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchurl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchurl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchurl={requests.fetchRomanceMovies} />
      <Row title="documentaries" fetchurl={requests.fetchDocumentaries} />
    </div>
  );
}

export default HomeScreen