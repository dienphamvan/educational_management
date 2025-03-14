import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { GetCommonStudentsRequestDto } from './dto/get-common-students-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { SuspendRequestDto } from './dto/suspend-request.dto';
import { TeacherService } from './teacher.service';
import { RetrieveNotificationsDto } from './dto/retrieve-notifications-request.dto';

@Controller()
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Post('register')
  @HttpCode(204)
  register(@Body() body: RegisterRequestDto) {
    return this.teacherService.register(body);
  }

  @Get('commonstudents')
  getCommonStudents(@Query() query: GetCommonStudentsRequestDto) {
    return this.teacherService.getCommonStudents(query);
  }

  @Post('suspend')
  @HttpCode(204)
  suspend(@Body() body: SuspendRequestDto) {
    return this.teacherService.suspend(body);
  }

  @Post('retrievefornotifications')
  @HttpCode(200)
  retrieveNotifications(@Body() body: RetrieveNotificationsDto) {
    return this.teacherService.retrieveNotifications(body);
  }
}
