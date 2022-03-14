import React from "react";
import EducationGameCard from "../components/EducationGameCard";
import PublicGameCard from "../components/PublicGameCard";
import Grid from "@material-ui/core/Grid";

const GameCards = () => {
  return (
    <div className="row" style={{ whiteSpace: "nowrap" }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        //justify="center"
        style={{ minHeight: "100vh" }}
        display="flex"
      >
        <Grid>
          <PublicGameCard /> <EducationGameCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default GameCards;
