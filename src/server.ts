import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpect from './spects';
import cors from 'cors';
import statistic from './routes/statistic';
import path from 'path';
import dbConnection from './database/config';

class Server {
  private app: Application;
  private port: String | any;
  private apiPath = {
    statistic: '/api/statistic',
  };

  constructor() {
    this.port = process.env.PORT || '8000';

    this.app = express();

    this.conectarBD();

    this.middlewares();

    this.routes();
  }

  async conectarBD() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(path.resolve(__dirname, '../dist')));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpect));
  }

  routes() {
    this.app.use(this.apiPath.statistic, statistic);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening at the port :  ${this.port} - ${process.env.PORT}`);
    });
  }
}

export default Server;
