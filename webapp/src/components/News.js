import React, { useState, useEffect, useContext } from 'react';
import { Card, Icon, Header } from 'semantic-ui-react';

function News() {
  const [article, setArticle] = useState();

  return (
    <Card style={{ width: '100%' }}>
      <Card.Content>
        <Header style={{ opacity: '0.6' }} floated="left">
          <Icon name="newspaper" />
          Articles
        </Header>
      </Card.Content>
      <Card.Content></Card.Content>
    </Card>
  );
}

export default News;
