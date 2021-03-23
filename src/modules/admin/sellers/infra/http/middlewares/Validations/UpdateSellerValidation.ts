import { celebrate, Joi, Segments } from 'celebrate';

const UpdateSellerValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    description: Joi.string().required(),
    active: Joi.boolean().required(),
  },
});

export default UpdateSellerValidation;
