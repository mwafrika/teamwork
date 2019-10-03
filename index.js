import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swagerUI from 'swagger-ui-express';
import cors from 'cors';
import userRoute from './Server/routes/userRoute';
import articleRoutes from './Server/routes/articleRoutes';
import swagger from './documentation.json';

const apiUrl = 'https://teamwork1.herokuapp.com/api/v1/api-docs/';

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.get('/', (req, res, next) => {
  res.status(200).send({ status: 200, message: `Welcome to Teamwork!!! to access the swagger documentation for api version 1 please follow this link ${apiUrl} ` });
});

// allow to show response at swaggerUI
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-methods', 'GET, PUT, PATCH, POST, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/v1/api-docs', swagerUI.serve, swagerUI.setup(swagger));

app.use(userRoute);
app.use(articleRoutes);
app.use('**', (req, res) => res.status(405).send({
  status: 405,
  message: `The requested resource was not found, Visit the documentation link ${apiUrl}`,
}));
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening to the port ${port} ...`);
});

export default app;
