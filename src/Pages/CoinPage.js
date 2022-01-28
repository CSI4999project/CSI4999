import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CoinPage = () => {
  const {id} = useParams();
  const [coin, setCoin] = useState();

  return (
  <div>coin page</div>
  );
};

export default CoinPage;
