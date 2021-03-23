import { celebrate, Joi, Segments } from 'celebrate';

const CreateSellerValidation = celebrate({
  [Segments.BODY]: {
    description: Joi.string().required(),
    real_estate_id: Joi.string().uuid().required(),
    active: Joi.boolean().required(),
  },
});

export default CreateSellerValidation;
