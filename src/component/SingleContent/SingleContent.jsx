import { Badge } from "@mui/material";
import React from "react";
import { img_300, unavailable } from "../../Config/Config";
import "./SingleContent.css";
import { useState, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const baseUrl = `https://www.youtube.com/embed/`;
const SingleContent = ({
  id,
  poster,
  date,
  title,
  media_type,
  vote_average,
}) => {
  // const [content, setContent] = useState();
  const [video, setVideo] = useState([]);
  const [modal, setModal] = useState(false);

  const fetchVideo = async (getId) => {
    let data = await fetch(
      `https://api.themoviedb.org/3/movie/${getId}/videos?api_key=${process.env.REACT_APP_API_KEY}`
    );
    let result = await data.json();
    console.log(result.results);
    if (result.results.length === 0) {
      setVideo([]);
    } else {
      setVideo(result.results);
    }
  };

  const toggleModal = () => {
    fetchVideo(id);
    console.log("toggle", id);
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  useEffect(() => {
    // fetchVideo();
  }, []);

  return (
    <>
      <div className="Mbox">
        <Badge
          sx={{ zIndex: 2 }}
          badgeContent={vote_average ? vote_average : "Not Yet"}
          color={vote_average > 6 ? "primary" : "secondary"}
        />
        <img
          className="poster"
          src={poster ? `${img_300}/${poster}` : unavailable}
        />
        <b className="title">{title}</b>
        <div className="tdiv">
          <span>{media_type === "tv" ? "Tv Series" : "Movie"}</span>
          <span>{date}</span>
        </div>

        <div className="tg-btn">
          <button className="more" onClick={toggleModal}>
            <MoreHorizIcon style={{ cursor: "pointer" }} />
          </button>
        </div>
      </div>
      {/* ContentModal */}
      <div
        className="modal"
        style={modal ? { display: "flex" } : { display: "none" }}
      >
        <div className="overlay">
          {video.length === 0
            ? "No data available"
            : video.map((data) => {
                return (
                  <div key={data.id} className="details__SingleContent">
                    <div className="video__details_SingleContent">
                      <iframe src={`${baseUrl}${data.key}`} />
                    </div>
                    <div className="allDetails__details_SingleContent">
                      <h3>{data.name}</h3>
                      <p>{data.type}</p>
                      <p>{data.published_at}</p>
                    </div>
                  </div>
                );
              })}
        </div>

        <button className="close-modal" onClick={toggleModal}>
          CLOSE
        </button>
      </div>
    </>
  );
};

export default SingleContent;
