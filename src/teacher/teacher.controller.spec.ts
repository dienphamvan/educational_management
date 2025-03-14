import { Test } from '@nestjs/testing';
import { GetCommonStudentsRequestDto } from './dto/get-common-students-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RetrieveNotificationsDto } from './dto/retrieve-notifications-request.dto';
import { SuspendRequestDto } from './dto/suspend-request.dto';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

describe('TeacherController', () => {
  let teacherController: TeacherController;
  let teacherService: TeacherService;
  const mockTeacherService = {
    register: jest.fn(),
    getCommonStudents: jest.fn(),
    suspend: jest.fn(),
    retrieveNotifications: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        {
          provide: TeacherService,
          useValue: mockTeacherService,
        },
      ],
    }).compile();

    teacherController = moduleRef.get(TeacherController);
    teacherService = moduleRef.get(TeacherService);
  });

  it('should be defined', () => {
    expect(teacherController).toBeDefined();
  });

  it('should call register teacher service with correct data', async () => {
    const dto: RegisterRequestDto = {
      teacher: 'teacher+1@gmail.com',
      students: ['student+1@gmail.com', 'student+2@gmail.com'],
    };

    await teacherController.register(dto);

    expect(teacherService.register).toHaveBeenCalledWith(dto);
  });

  it('should call getCommonStudents teacher service with correct data', async () => {
    const dto: GetCommonStudentsRequestDto = {
      teacher: ['teacher+1@gmail.com'],
    };

    await teacherController.getCommonStudents(dto);

    expect(teacherService.getCommonStudents).toHaveBeenCalledWith(dto);
  });

  it('should call suspend with correct data', async () => {
    const dto: SuspendRequestDto = {
      student: 'student+1@gmail.com',
    };

    await teacherController.suspend(dto);

    expect(teacherService.suspend).toHaveBeenCalledWith(dto);
  });

  it('should call register teacher service with correct data', async () => {
    const dto: RetrieveNotificationsDto = {
      notification: 'Hello students!',
      teacher: 'teacher+1@gmail.com',
    };

    await teacherController.retrieveNotifications(dto);

    expect(teacherService.retrieveNotifications).toHaveBeenCalledWith(dto);
  });
});
