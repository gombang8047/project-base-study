import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async postsFind() {
    return await this.postsService.findAll();
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
}
