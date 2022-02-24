import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user = await new UpdateUserAvatarService().execute({
      user_id: request.user.id,
      avatarFileName: request?.file?.filename,
    });

    return response.json(user);
  }
}
