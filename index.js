import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swagerUI from 'swagger-ui-express';
import userRoute from './Server/routes/userRoute';
import articleRoutes from './Server/routes/articleRoutes';
import swagger from './documentation.json';

const apiUrl = 'https://teamwork1.herokuapp.com/api/v1/api-docs/';

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send({ status: 200, message: `Welcome to Teamwork!!! to access the swagger documentation for api version 1 please follow this link ${apiUrl} ` });
});
app.use('/api/v1/api-docs', swagerUI.serve, swagerUI.setup(swagger));
// allow to show response at swaggerUI
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(userRoute);
app.use(articleRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to the port ${port} ...`);
});

export default app;
