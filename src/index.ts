import "dotenv/config";
import express from 'express';
import Routes from "./routes";

const app = express();

app.use(express.json());
app.use(new Routes().router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});