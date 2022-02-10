import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const TradingRulesInput = () => {
  return (
    <div>
      <Card className="create">
        <CardContent>
          <h2>Trading Rules</h2>
          <form>
            <label>Starting Investmment</label>
            <input type="text" required />
            <label>Party Size</label>
            <input type="text" required />
            <label>Transaction Fees</label>
            <input type="text" required />
            <label>Time Frame</label>
            <input type="text" required />
            <label>Tokens Available</label>
            <input type="text" required />
          </form>
          <Button variant="contained">Next</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingRulesInput;
