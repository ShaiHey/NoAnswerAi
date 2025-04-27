import { Router } from "express";
import validation from "../middlewares/validation";
import { newRequestValidator } from "../controllers/chat/validator";
import { requestChat } from "../controllers/chat/controller";

const chatRouter = Router();

chatRouter.post('/', validation(newRequestValidator), requestChat)

export default chatRouter;