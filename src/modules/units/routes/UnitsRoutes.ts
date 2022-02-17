import { Router } from 'express';
import UnitsController from '../controllers/UnitsController';

const unitsRouter = Router();
const unitsController = new UnitsController();

unitsRouter.get('/', unitsController.index);
unitsRouter.get('/:id', unitsController.show);
unitsRouter.post('/', unitsController.create);
unitsRouter.put('/:id', unitsController.update);
unitsRouter.delete('/:id', unitsController.delete);

export default unitsRouter;
