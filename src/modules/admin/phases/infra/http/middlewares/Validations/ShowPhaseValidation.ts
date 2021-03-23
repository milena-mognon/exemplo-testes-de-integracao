import { celebrate, Joi, Segments } from 'celebrate';

const ShowPhaseValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export default ShowPhaseValidation;
