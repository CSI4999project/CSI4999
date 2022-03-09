import React from "react";
import EducationGameCard from "../components/EducationGameCard";
import PublicGameCard from "../components/PublicGameCard";
import Grid from "@material-ui/core/Grid";

const GameCards = (props) => {
  const { classes } = props;

  return (
    <div className="row" style={{ "white-space": "nowrap" }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item sd={3}>
          <PublicGameCard /> <EducationGameCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default GameCards;
