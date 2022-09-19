import React from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import "./Header.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="name">
          <span onClick={() => window.scroll(0, 0)}>
            <span className="n_two">M</span>ovie
            <span className="n_two">P</span>oint
          </span>
        </div>
        <div className="button">
          <NavLink to="/Search" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{ color: "black", backgroundColor: "#b3b3ff" }}
              startIcon={<SearchIcon />}
              color="primary"
            >
              Search
            </Button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;
