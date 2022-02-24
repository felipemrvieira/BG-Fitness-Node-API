import unitsRouter from '@modules/units/routes/UnitsRoutes';
import usersRouter from '@modules/users/routes/UsersRoutes';
import { Router } from 'express';
import { resourceLimits } from 'worker_threads';

const routes = Router();

routes.use('/units', unitsRouter);
routes.use('/users', usersRouter);

export default routes;
