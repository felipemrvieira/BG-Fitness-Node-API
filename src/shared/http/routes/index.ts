import { Router } from 'express';
import { resourceLimits } from 'worker_threads';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

export default routes;
