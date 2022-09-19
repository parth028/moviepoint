import React, { useEffect } from "react";
import "./Movies.css";
import axios from "axios";
import { useState } from "react";
import CoPagination from "../../component/Pagination/CoPagination";
import SingleContent from "../../component/SingleContent/SingleContent";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setcontent] = useState([]);
  const [numOfPage, setnumOfPage] = useState();

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `
      https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    );
    console.log(data);
    setcontent(data.results);
    setnumOfPage(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
  }, [page]);
  //n react-hooks/exhaustive-deps

  return (
    <div>
      <span className="pageTitel">Movies</span>
      <div className="genres"></div>
      <div className="Movies">
        {content &&
          content.map((c) => {
            return (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type="Movie"
                vote_average={c.vote_average}
              />
            );
          })}
      </div>
      {numOfPage > 1 && (
        <CoPagination setpage={setPage} numOfPage={numOfPage} />
      )}
    </div>
  );
};

export default Movies;
