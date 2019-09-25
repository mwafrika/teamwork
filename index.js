import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swagerUI from 'swagger-ui-express';
import userRoute from './Server/routes/userRoute';
import articleRoutes from './Server/routes/articleRoutes';
import swagger from './documentation.json';

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.status(200).send({ status: 200, message: 'Welcome to Teamwork' });
});
app.use('/api/v1/api-docs', swagerUI.serve, swagerUI.setup(swagger));
app.use(userRoute);
app.use(articleRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to the port ${port} ...`);
});

export default app;
