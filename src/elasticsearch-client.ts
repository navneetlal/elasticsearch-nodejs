import elasticsearch from 'elasticsearch';

class ElasticSearchClient {
  public client: elasticsearch.Client;
  public indexName: string;

  constructor(indexName: string) {
    this.indexName = indexName;
    this.client = new elasticsearch.Client({
      host: 'elasticsearch:9200',
      log: 'trace',
      apiVersion: '7.4'
    });

    this.initializeMapping().catch(err => console.log(err));
  }

  private initializeMapping() {
    return this.indexExist().then((exist: boolean) => {
      if (exist) {
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
      } else throw new Error('Oops..! Cannot find the index');
    });
  }

  public indexExist() {
    return this.client.indices.exists({
      index: this.indexName
    });
  }

}

export default ElasticSearchClient;