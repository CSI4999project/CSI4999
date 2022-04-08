import React from "react";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { TextField } from "@mui/material";

const JoinClass = () => {
  return (
    <div>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ padding: 30 }}>
          Join Class
        </Typography>
        <TextField
          sx={{ input: { color: 'white' } }}
          label="Enter Class Code"
          variant="outlined"
          style={{ marginBottom: 20, width: "40%", backgroundColor: "#14161a"}}
          InputLabelProps={{
            style: { color: '#fff' },
          }}
        />
      </Container>
    </div>
  );
};

export default JoinClass;
