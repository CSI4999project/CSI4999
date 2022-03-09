import React from 'react'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
    card: {
      minWidth: 275,
      display: "inline-block"
    }
  };

  function PublicGameCard(props) {
    const { classes } = props;
  
    return (
      <div style={{ display: "inline-block" }}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title}>
              Public Version
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  PublicGameCard.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(PublicGameCard);