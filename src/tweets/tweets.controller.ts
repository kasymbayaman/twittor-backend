import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {AuthUser} from '../common/decorators/auth-user.decorator';
import {User} from '../users/entities/user.entity';

@ApiTags('tweets')
@ApiBearerAuth()
@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  create(@Body() createTweetDto: CreateTweetDto, @AuthUser() user: User) {
    return this.tweetsService.createTweet(createTweetDto, user);
  }

  @Get()
  findAll() {
    return this.tweetsService.getTweets();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tweetsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTweetDto: UpdateTweetDto,
    @AuthUser() user: User,
  ) {
    return this.tweetsService.updateMyTweet(+id, updateTweetDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @AuthUser() user: User) {
    return this.tweetsService.removeMyTweet(+id, user);
  }
}
