import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';
import DeleteUserService from '../services/DeleteUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const user = await new CreateSessionService().execute({
      email,
      password,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await new DeleteUserService().execute({ id });

    return response.status(204).send();
  }
}
