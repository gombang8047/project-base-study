import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async postsFind(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const skip = (+page - 1) * +limit;
    return await this.postsService.findAll(skip, +limit);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async postCreate(
    @Body() body: { title: string; content: string },
    @Req() req,
  ) {
    return await this.postsService.create(
      body.title,
      body.content,
      req.user.userId,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async postDelete(@Param('id') id: string, @Req() req) {
    return await this.postsService.delete(+id, req.user.userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async postEdit(
    @Param('id') id: string,
    @Req() req,
    @Body() body: { title: string; content: string },
  ) {
    return await this.postsService.edit(
      +id,
      req.user.userId,
      body.title,
      body.content,
    );
  }
}
