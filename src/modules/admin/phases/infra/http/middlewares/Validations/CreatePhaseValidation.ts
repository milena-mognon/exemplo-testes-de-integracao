import { celebrate, Joi, Segments } from 'celebrate';

const CreatePhaseValidation = celebrate({
  [Segments.BODY]: {
    description: Joi.string().required(),
  },
});

export default CreatePhaseValidation;
