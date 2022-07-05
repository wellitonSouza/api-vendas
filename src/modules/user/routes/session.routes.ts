import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import SessionController from '../controller/SesseionController';

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.session,
);

export default sessionRouter;
