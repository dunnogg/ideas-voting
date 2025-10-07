import { Idea } from '@prisma/client';

export interface IdeaWithVotesCount extends Pick<Idea, 'id' | 'title'> {
  votes: number;
}
