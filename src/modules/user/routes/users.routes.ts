import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserController from '../controller/UserController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controller/UserAvatarController';

const userRouter = Router();
const userController = new UserController();
const userAvatarControler = new UserAvatarController();
const upload = multer(uploadConfig);

userRouter.get('/', isAuthenticated, userController.index);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

userRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarControler.update,
);

export default userRouter;
