import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

class SessionController {
  public async session(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;
    const sessionUser = new CreateSessionService();
    const user = await sessionUser.execute({ email, password });
    return response.json(user);
  }
}

export default SessionController;
