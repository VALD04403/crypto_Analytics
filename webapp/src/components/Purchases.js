import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Image } from 'semantic-ui-react';
import { bitcoin } from '../assets/svg/bitcoin.svg';

function Purchases() {
  const [items, setItems] = useState();

  const getPurchases = async () => {
    const response = await axios.get('/api/purchases');
    setItems(response.data.purchases);
  };

  useEffect(() => {
    getPurchases();
  }, []);

  return (
    <div>
      <Card>
        <Card.Content>
          <h2 style={{ fontWeight: '200' }}>
            <Image
              style={{ width: '30px', height: '30px' }}
              src={bitcoin}
            ></Image>
            Bitcoin
          </h2>
        </Card.Content>
      </Card>
    </div>
  );
}

export default Purchases;
