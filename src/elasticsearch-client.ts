import elasticsearch from 'elasticsearch';
import promiseRetry from 'promise-retry';
import { OperationOptions } from 'retry';

class ElasticSearchClient {
  public client: elasticsearch.Client;
  public indexName: string;

  private retryOperationOptions: OperationOptions = {
    minTimeout: 2000,
    retries: 10,
    maxTimeout: 4000
  }

  constructor(indexName: string) {
    this.indexName = indexName;
    this.client = new elasticsearch.Client({
      host: 'elasticsearch:9200',
      log: 'trace',
      apiVersion: '7.4'
    });

    this.initializeIndex();
  }

  private initializeIndex() {
    promiseRetry(this.retryOperationOptions, (retry) => {
      return this.indexExist().then((exist: boolean) => {
        if (exist) {
          return this.initializeMapping()
        } else {
          return this.client.indices.create({
            index: this.indexName
          }).then(() => this.initializeMapping())
        }
      }).catch(err => retry(err));
    })

  }

  private initializeMapping() {
    return this.client.indices.putMapping({
      index: this.indexName,
      type: "document",
      body: {
        properties: {
          title: { type: "text" },
          content: { type: "text" },
          suggest: {
            type: "completion",
            analyzer: "simple",
            search_analyzer: "simple"
          }
        }
      }
    });
  }

  public indexExist() {
    return this.client.indices.exists({
      index: this.indexName
    });
  }

}

export default ElasticSearchClient;