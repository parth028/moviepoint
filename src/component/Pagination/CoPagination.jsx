import React from "react";
import { Pagination } from "@mui/material";

const CoPagination = ({ setpage, numOfPage }) => {
  const handlePageChange = (page) => {
    setpage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",

        display: "flex",
        justifyContent: "center",
        marginTop: "5px",
        paddingBottom: "80px",
        color: "white",
      }}
    >
      <Pagination
        count={numOfPage}
        onChange={(e) => handlePageChange(e.target.textContent)}
        color="primary"
        sx={{
          bgcolor: "	#778899",
          pt: { xs: 1 },
          pb: { xs: 1 },
          borderRadius: "5px",
        }}
      />
    </div>
  );
};

export default CoPagination;
