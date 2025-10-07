import { Request, Response } from 'express';
import { IdeasService } from '../services/ideas.service';
import { getClientIp } from '../utils/ip';

const ideasService = new IdeasService();

export class IdeasController {
  static async getIdeas(req: Request, res: Response) {
    const result = await ideasService.getIdeas();

    return res.json(result);
  }

  static async vote(req: Request, res: Response) {
    const { ideaId } = req.body;
    const ip = getClientIp(req);
    const result = await ideasService.voteForIdea(Number(ideaId), ip);

    return res.json(result);
  }
}
