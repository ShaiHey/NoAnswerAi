import express, { json } from "express";
import cors from "cors";
import config from "config";
import errorLogger from "./middlewares/error/error-logger";
import errorResponder from "./middlewares/error/error-responder";
import notFound from "./middlewares/not-found";
import logRequest from "./middlewares/log-request";
import chatRouter from "./routers/chat";

const port = config.get<number>('app.port');
const name = config.get<string>('app.name');

const server = express();

(async() => {
    // Middlewares
    server.use(cors());
    server.use(json());

    server.use(logRequest)
    
    server.use('/chat', chatRouter)

    // Special notFound middleware
    server.use(notFound);

    // Error middleware
    server.use(errorLogger)
    server.use(errorResponder)

    server.listen(port, () => console.log(`Server ${name} started on port ${port}.....`));
})();