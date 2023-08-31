import "express-async-errors"
import "dotenv/config";
import express from 'express';
import Routes from "./routes";
import HandleError from "./middlewares/HandleError";

const app = express();

app.use(express.json());
app.use(Routes.routes());
app.use(HandleError)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});