import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismaModule, ArticlesModule],
})
export class AppModule {}
