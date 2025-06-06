import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import tmdbApi from "./../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./detail.scss";
import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from "./../../components/movie-list/MovieList";

const Detail = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>

          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.backdrop_path || item.poster_path
                  )})`,
                }}
              ></div>
            </div>

            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, index) => (
                    <span key={index} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <div className="release-date">
                <strong>Release Date:</strong> {item.release_date || "N/A"}
              </div>
              <div className="vote-info">
                <strong>User Score:</strong>
                <div className="circular-progress">
                  <CircularProgressbar
                    value={item.vote_average ? item.vote_average * 10 : 0}
                    text={`${
                      item.vote_average
                        ? (item.vote_average * 10).toFixed(0)
                        : "N/A"
                    }%`}
                    styles={buildStyles({
                      textSize: "1.5rem",
                      pathColor: `rgba(76, 375, 90, ${
                        item.vote_average / 10
                      })`,
                      textColor: "#8a7979",
                      trailColor: "#d6d6d6",
                    })}
                  />
                </div>
                <p className="vote-count" style={{ margin: 0 }}>
                  ({item.vote_count || "N/A"} votes)
                </p>
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                {/* casts list */}
                <CastList id={item.id} />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
