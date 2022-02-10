import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const TradingRulesInput = () => {
  return (
    <div>
    <br />
      <Card className="create"> {/* the styles are in app.css */}
        <CardContent>
          <h2>Trading Rules</h2>
          <br />
          <form>
            <label>Starting Investmment</label>
            <input type="number" placeholder="Enter the amount you'd like to start investting" min="0" max="1000" step="5" required />
            <label>Party Size</label>
            <input type="text" placeholder="1-16" required />
            <label>Transaction Fees</label>
            <input type="text" placeholder="0-5%" required />
            <label>Time Frame</label>
            <input type="text" placeholder="Enter number of days" required />
            <label>Tokens Available</label>
            <input type="text" placeholder="0-300" required />
          </form>
          <Button variant="contained">Next</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingRulesInput;
