import joi from "joi";

const addBrandSchema = joi.object({
    name: joi.string().min(2).max(50).trim().required(),
    file: joi.object({
      size: joi.number().positive().required(),
      path: joi.string().required(),
      filename: joi.string().required(),
      destination: joi.string().required(),
      mimetype: joi.string().required(),
      encoding: joi.string().required(),
      originalname: joi.string().required(),
      fieldname: joi.string().required(),
    }),
  })
  .required();
export default addBrandSchema;
