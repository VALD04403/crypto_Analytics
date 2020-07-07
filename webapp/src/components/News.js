import React, { useState, useEffect, useContext } from 'react';
import { Card, Icon, Header } from 'semantic-ui-react';

function News(props) {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Content>
        <Header style={{ opacity: '0.6' }} floated='left'>
          <Icon name='newspaper' />
          Articles
        </Header>
      </Card.Content>
      <Card.Content>
        {props.articles &&
          props.articles.map((article) => (
            <div key={article.id}>
              <h4 style={{ cursor: 'pointer' }}>{article.title}</h4>
            </div>
          ))}
      </Card.Content>
    </Card>
  );
}

export default News;
