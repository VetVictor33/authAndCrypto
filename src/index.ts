import express from 'express';
import "express-async-errors";
import HandleError from "./middlewares/HandleError";
import Routes from "./routes";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {

    const app = express()

    app.use(express.json())
    app.use(Routes.routes())
    app.use(HandleError)

    const port = process.env.PORT || 3000

    return app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    });

}).catch((error) => {
    console.log(error)
})