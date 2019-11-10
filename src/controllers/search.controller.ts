import express, { Router } from 'express'
import { Client } from 'elasticsearch';

class SearchController {
  public path: string = '/search';
  public router: Router = express.Router();

  private client: Client;

  constructor(_client: Client) {
    this.client = _client;

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getSearchResults)
  }

  getSearchResults = (request: express.Request, response: express.Response) => {
    // const key: string = request.query.q;
    console.log(request.query)
    this.client.cluster.health({}, function (err, resp) {
      if(err) console.log('Error: ', err)
      console.log("-- Client Health --", resp);
    });
    // this.client.suggest()
    response.status(200).json({ "value": 1 })
  }

}

export default SearchController;