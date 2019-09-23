import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoute from './Server/routes/userRoute';


dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(userRoute);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`listening to the port ${port} ...`);
});

export default app;
