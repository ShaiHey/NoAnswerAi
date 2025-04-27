import Joi from "joi";

export const newRequestValidator = Joi.object({
    userId: Joi.string().uuid().required(),
    message: Joi.string().required()
})

export const updatePostValidator = newRequestValidator;