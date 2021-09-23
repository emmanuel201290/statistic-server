import swaggerJSDoc from 'swagger-jsdoc';

const definition = {
  openapi: '3.0.0',
  info: {
    title: 'API COVI 19',
    version: '1.0.0',
    description: 'Show the information about statistic of covi 19 around the world',

    contact: {
      name: 'Emmanuel Martinez',
    },
  },
  servers: [
    {
      url: 'http://localhost:8080/api/statistic',
      description: 'Development server',
    },
    {
      // url: 'https://covid-19-statistics-api.herokuapp.com/api',
      // description: 'Production server',
    },
  ],
};

const options = {
  definition,
  apis: ['src/routes/*.ts'],
};

const spect = swaggerJSDoc(options);

export default spect;
