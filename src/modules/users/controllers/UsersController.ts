import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const units = await new ListUserService().execute();

    return response.json(units);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const unit = await new ShowUserService().execute({ id });

    return response.json(unit);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const unit = await new CreateUserService().execute({
      name,
      email,
      password,
    });

    return response.json(unit);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const unit = await new UpdateUserService().execute({
      id,
      name,
      email,
      password,
    });

    return response.json(unit);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await new DeleteUserService().execute({ id });

    return response.status(204).send();
  }
}
