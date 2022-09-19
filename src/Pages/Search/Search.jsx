import { Button, Tab, Tabs, TextField } from "@mui/material";
import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import CoPagination from "../../component/Pagination/CoPagination";
import SingleContent from "../../component/SingleContent/SingleContent";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <div className="search">
        <TextField
          sx={{ flex: 1, backgroundColor: "white" }}
          className="searchBox"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button onClick={fetchSearch} variant="contained">
          <SearchIcon fontSize="large" />
        </Button>
      </div>
      <Tabs
        value={type}
        centered
        className="tabs"
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        sx={{
          padding: 1,
          display: "flex",
          backgroundColor: "#b3b3ff",
          justifyContent: "center",
        }}
        aria-label="disabled tabs example"
      >
        <Tab sx={{ width: "100%", fontSize: "20px" }} label="Search Movies" />
        <Tab
          sx={{ width: "100%", fontSize: "20px" }}
          label="Search TV Series"
        />
      </Tabs>

      <div className="searcharea">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CoPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
