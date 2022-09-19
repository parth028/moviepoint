import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import TvIcon from "@mui/icons-material/Tv";
import "./Header/MainNav.css";
import { Link } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0px",
        width: "100%",
        zIndex: "80",
      }}
    >
      <BottomNavigation
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#b3b3ff",
          display: "flex",
          justifyContent: "space-around",
          textDecoration: "none",
        }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          to="/"
          component={Link}
          label="Trending"
          icon={<WhatshotIcon />}
        />

        <BottomNavigationAction
          to="/Movies"
          component={Link}
          label="Movies"
          icon={<MovieCreationIcon />}
        />

        <BottomNavigationAction
          to="/Series"
          component={Link}
          label="TV Series"
          icon={<TvIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
