import React from 'react';
import { Card, Icon, Header, Image } from 'semantic-ui-react';
import '../styles/News.css';

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
          props.articles.splice(0, 10).map((article) => (
            <div
              key={article.id}
              style={{ marginBottom: '15px', flexDirection: 'row' }}
            >
              <Image
                circular
                style={{ width: '30px', marginRight: '20px' }}
                src={article.imageurl}
              />
              <a href={article.url} target='_blank'>
                {article.title} - {article.source_info.name}
              </a>
            </div>
          ))}
      </Card.Content>
    </Card>
  );
}

export default News;
