import { Router } from 'express';
import UnitsController from '../controllers/UnitsController';
import { celebrate, Joi, Segments } from 'celebrate';

const unitsRouter = Router();
const unitsController = new UnitsController();

unitsRouter.get('/', unitsController.index);
unitsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  unitsController.show,
);
unitsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      address: Joi.string().required(),
    },
  }),

  unitsController.create,
);
unitsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      address: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  unitsController.update,
);
unitsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  unitsController.delete,
);

export default unitsRouter;
