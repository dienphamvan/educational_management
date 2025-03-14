import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TeacherModule, PrismaModule],
})
export class AppModule {}
