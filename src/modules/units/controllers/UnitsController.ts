import { Request, Response } from 'express';
import CreateUnitService from '../services/CreateUnitService';
import DeleteUnitService from '../services/DeleteUnitService';
import ListUnitService from '../services/ListUnitService';
import ShowUnitService from '../services/ShowUnitService';
import UpdateUnitService from '../services/UpdateUnitService';

export default class UnitsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const units = await new ListUnitService().execute();

    return response.json(units);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const unit = await new ShowUnitService().execute({ id });

    return response.json(unit);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, address } = request.body;

    const unit = await new CreateUnitService().execute({ name, address });

    return response.json(unit);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, address } = request.body;

    const unit = await new UpdateUnitService().execute({ id, name, address });

    return response.json(unit);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await new DeleteUnitService().execute({ id });

    return response.status(204).send();
  }
}
