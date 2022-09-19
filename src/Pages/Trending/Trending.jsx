import React, { useEffect, useState } from "react";
import "./Trending.css";
import axios from "axios";
import SingleContent from "../../component/SingleContent/SingleContent";
import CoPagination from "../../component/Pagination/CoPagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState();
  const [numOfPage, setnumOfPage] = useState();

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    setContent(data.results);
    setnumOfPage(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
  }, [page]);

  return (
    <>
      <div>
        <span className="pageTitel">Trending</span>
        <div></div>
        <div className="trending">
          {content &&
            content.map((c) => {
              return (
                <>
                  <SingleContent
                    key={c.id}
                    id={c.id}
                    poster={c.poster_path}
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media_type={c.media_type}
                    vote_average={c.vote_average}
                  />
                </>
              );
            })}
        </div>
        {numOfPage > 1 && (
          <CoPagination setpage={setPage} numOfPage={numOfPage} />
        )}
      </div>
    </>
  );
};

export default Trending;
