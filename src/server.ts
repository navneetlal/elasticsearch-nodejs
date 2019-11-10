import App from './app';
import ElasticSearchClient from './elasticsearch-client';

import SearchController from './controllers/search.controller';

const elasticsearchClient = new ElasticSearchClient('article');

const app = new App(
  [
    new SearchController(elasticsearchClient.client)
  ],
  3000
);

app.listen();