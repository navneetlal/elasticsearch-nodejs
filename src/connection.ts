import elasticsearch from 'elasticsearch';
import { Client } from 'elasticsearch';

const client: Client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
  apiVersion: '6.3.2'
});

export default client;