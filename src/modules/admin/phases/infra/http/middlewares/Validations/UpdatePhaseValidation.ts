import { celebrate, Joi, Segments } from 'celebrate';

const UpdatePhaseValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    description: Joi.string().required(),
  },
});

export default UpdatePhaseValidation;
