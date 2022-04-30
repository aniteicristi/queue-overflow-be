import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswersService } from 'src/answers/answers.service';
import { Answer } from 'src/answers/entities/answer.entity';
import { Question } from 'src/questions/entities/question.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateAnswerVoteDto } from './dto/create-answer-vote.dto';
import { CreateQuestionVoteDto } from './dto/create-question-vote.dto';
import { AnswerVote } from './entities/answer-vote.entity';
import { QuestionVote } from './entities/question-vote.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(QuestionVote)
    private questionVoteRepository: Repository<QuestionVote>,

    @InjectRepository(AnswerVote)
    private answerVoteRepository: Repository<AnswerVote>,

    private readonly userService: UsersService,

    private readonly questionService: QuestionsService,

    private readonly answerService: AnswersService,
  ) {}

  async findVoteQuestion(id: number, user: number) {
    let vote = await this.questionVoteRepository.findOne({
      where: {
        question: id,
        userFrom: user,
      },
    });
    if (vote == null) return {};
    else return { isLiked: vote.amount == 1 };
  }

  async findVoteAnswer(id: number, user: number) {
    let vote = await this.answerVoteRepository.findOne({
      where: {
        answer: id,
        userFrom: user,
      },
    });
    if (vote == null) return {};
    else return { isLiked: vote.amount == 1 };
  }

  //! Returns the questions score!
  async voteQuestion(createVoteDto: CreateQuestionVoteDto, userFromId: number) {
    let question: Question = await this.questionService.findOne(
      createVoteDto.questionId,
    );
    let vote: QuestionVote = await this.questionVoteRepository.findOne({
      where: {
        userFrom: { id: userFromId },
        userTo: { id: question.author.id },
        question: { id: createVoteDto.questionId },
      },
      relations: ['userFrom', 'userTo', 'question'],
    });

    if (vote != null) {
      if (vote.amount == createVoteDto.amount) {
        return vote.question.clout;
      }
      //unlike/like then like/unlike, so increment/decrement by 2
      this.questionService.vote(vote.question.id, createVoteDto.amount * 2);

      vote.amount = createVoteDto.amount;
      await this.questionVoteRepository.save(vote);

      //if unlike, then we have to subtract 5 points then two more
      //if like, then we have to cancel the unlike (add 2) then add 5 for the like.
      this.userService.score(vote.userTo.id, createVoteDto.amount * 7);

      return vote.question.clout + createVoteDto.amount * 2;
    } else {
      let userFrom: User = await this.userService.findOne(userFromId);
      let userTo: User = await this.userService.findOne(question.author.id);

      vote = new QuestionVote(userFrom, userTo, question, createVoteDto.amount);
      this.questionService.vote(vote.question.id, vote.amount);

      this.userService.score(vote.userTo.id, vote.amount == -1 ? -2 : 5);

      await this.questionVoteRepository.save(vote);
      return vote.question.clout + createVoteDto.amount;
    }
  }
  //! Returns the answers score!
  async voteAnswer(createVoteDto: CreateAnswerVoteDto, userFromId: number) {
    let answer: Answer = await this.answerService.findOne(
      createVoteDto.answerId,
    );
    let vote: AnswerVote = await this.answerVoteRepository.findOne({
      where: {
        userFrom: { id: userFromId },
        userTo: { id: answer.author.id },
        answer: { id: createVoteDto.answerId },
      },
      relations: ['userFrom', 'userTo', 'answer'],
    });

    if (vote != null) {
      if (vote.amount == createVoteDto.amount) {
        return vote.answer.clout;
      }
      //unlike/like then like/unlike, so increment/decrement by 2
      this.answerService.vote(vote.answer.id, createVoteDto.amount * 2);

      vote.amount = createVoteDto.amount;
      await this.answerVoteRepository.save(vote);

      //if unlike, then we have to subtract 10 points then 2 more
      //if like, then we have to cancel the unlike (add 2) then add 10 for the like.
      this.userService.score(vote.userTo.id, createVoteDto.amount * 12);

      //If like (from unlike) then we add 1
      //If unlike (from like) when we subtract 1
      this.userService.score(vote.userFrom.id, createVoteDto.amount);

      return vote.answer.clout + createVoteDto.amount * 2;
    } else {
      let userFrom: User = await this.userService.findOne(userFromId);
      let userTo: User = await this.userService.findOne(answer.author.id);

      vote = new AnswerVote(userFrom, userTo, answer, createVoteDto.amount);
      this.answerService.vote(vote.answer.id, vote.amount);

      this.userService.score(vote.userTo.id, vote.amount < 0 ? -2 : 10);

      if (vote.amount < 0) this.userService.score(vote.userFrom.id, -1);

      await this.answerVoteRepository.save(vote);
      return vote.answer.clout + createVoteDto.amount;
    }
  }
}
