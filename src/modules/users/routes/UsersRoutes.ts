import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controllers/SessionsController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersAvatarController from '../controllers/UsersAvatarController';

const userRouter = Router();
const userController = new UsersController();
const sessionsController = new SessionsController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

userRouter.get('/', isAuthenticated, userController.index);
userRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userController.show,
);
userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

userRouter.put(
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
  userController.update,
);

userRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

userRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userController.delete,
);

userRouter.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),

  sessionsController.create,
);

export default userRouter;
