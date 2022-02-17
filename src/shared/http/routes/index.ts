import unitsRouter from '@modules/units/routes/UnitsRoutes';
import { Router } from 'express';
import { resourceLimits } from 'worker_threads';

const routes = Router();

routes.use('/units', unitsRouter);

export default routes;
