/**
 * @this App
 * @exports App
 * 
 * @author Navneet Lal Gupta
 */

import bodyParser from 'body-parser';
import express from 'express';

import IController from './interfaces/controller.interface'

class App {
  public app: express.Application;
  public port: number;

  /**
   * @constructor
   * @param controller 
   * @param port 
   */
  constructor(controller: IController[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddleware();
    this.initializeControllers(controller);
  }

  /**
   * @func listen Starts the server at given port.
   */
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`server started at http://localhost:${this.port}`);
    })
  }

  /**
   * @func initializeMiddleware Initializes all the middleware
   */
  private initializeMiddleware(): void {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router)
    })
  }
  
}

export default App;