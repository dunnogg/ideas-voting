import { PrismaClient } from '@prisma/client';
import { IdeaWithVotesCount } from '../../shared/interfaces/index';
import { ServiceErrorRes, ServiceRes } from '../../shared/types/index';

const prisma = new PrismaClient();

export class IdeasService {
  async getIdeas(): ServiceRes<IdeaWithVotesCount[]> {
    const ideas = await prisma.idea.findMany({
      include: { votes: true },
      orderBy: { votes: { _count: 'desc' } },
    });

    const mappedIdeas: IdeaWithVotesCount[] = ideas.map((i) => ({
      id: i.id,
      title: i.title,
      votes: i.votes.length,
    }));

    return {
      status: 'ok',
      data: mappedIdeas,
    };
  }

  async voteForIdea(ideaId: number, ip: string): ServiceRes<{ voted: true }> {
    const voteCount = await prisma.vote.count({ where: { ip } });

    if (voteCount >= 10) {
      return {
        status: 'error',
        code: 409,
        reason: 'Вы достигли лимита голосов. Максимум 10',
      };
    }

    const alreadyVoted = await this.checkVoteStatus(ideaId, ip);

    if (alreadyVoted) return alreadyVoted;

    await prisma.vote.create({
      data: { ideaId, ip },
    });

    return {
      status: 'ok',
      data: {
        voted: true,
      },
    };
  }

  private async checkVoteStatus(ideaId: number, ip: string): Promise<ServiceErrorRes | undefined> {
    const alreadyVoted = await prisma.vote.findFirst({
      where: {
        ideaId,
        ip,
      },
    });
    if (alreadyVoted) {
      return {
        status: 'error',
        code: 409,
        reason: 'Вы уже голосовали за эту идею',
      };
    }
  }
}
