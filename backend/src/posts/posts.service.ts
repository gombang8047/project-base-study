import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(skip: number, take: number) {
    return await this.prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            email: true,
            username: true,
            picture: true,
            role: true,
          },
        },
      },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(title: string, content: string, authorId: number) {
    return await this.prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, username: true, picture: true, role: true },
        },
      },
    });
  }

  async delete(id: number, userId: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    if (post?.authorId !== userId) {
      throw new Error('본인의 게시물만 삭제할 수 있습니다');
    }

    return await this.prisma.post.delete({
      where: { id },
    });
  }

  async edit(id: number, userId: number, title: string, content: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    if (post?.authorId !== userId) {
      throw new Error('본인의 게시물만 수정할 수 있습니다');
    }
    return await this.prisma.post.update({
      where: { id },
      data: { title, content },
    });
  }
}
