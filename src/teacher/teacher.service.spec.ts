import { Test } from '@nestjs/testing';
import { TeacherService } from './teacher.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { mockPrismaService } from 'src/common/mock/prisma-service.mock';

describe('TeacherService', () => {
  let teacherService: TeacherService;
  const teacherEmail = 'teacher+1@gmail.com';
  const studentsEmail = ['student+1@gmail.com', 'student+2@gmail.com'];

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: PrismaService, useValue: mockPrismaService },
        TeacherService,
      ],
    }).compile();

    teacherService = moduleRef.get(TeacherService);
  });

  it('should be defined', () => {
    expect(teacherService).toBeDefined();
  });

  it('should register students to a teacher when both exist', async () => {
    const mockTeacher = { id: 1, email: 'test' };
    const mockStudents = [{ id: 1 }, { id: 2 }];

    mockPrismaService.teacher.findUnique.mockResolvedValue(mockTeacher);
    mockPrismaService.student.findMany.mockResolvedValue(mockStudents);
    mockPrismaService.teacherStudent.createMany.mockResolvedValue(1);

    const result = await teacherService.register({
      teacher: teacherEmail,
      students: studentsEmail,
    });

    expect(mockPrismaService.teacher.findUnique).toHaveBeenCalledWith({
      where: { email: teacherEmail },
    });
    expect(mockPrismaService.student.findMany).toHaveBeenCalledWith({
      where: { email: { in: studentsEmail } },
    });
    expect(mockPrismaService.teacherStudent.createMany).toHaveBeenCalledWith({
      data: [
        { teacherId: 1, studentId: 1 },
        { teacherId: 1, studentId: 2 },
      ],
      skipDuplicates: true,
    });
    expect(result).toEqual(undefined);
  });

  it('should throw an error when teacher does not exist', async () => {
    mockPrismaService.teacher.findUnique.mockResolvedValue(null);

    await expect(
      teacherService.register({
        teacher: teacherEmail,
        students: studentsEmail,
      }),
    ).rejects.toThrow('Teacher email not found');
  });

  it('should throw an error when students do not exist', async () => {
    mockPrismaService.teacher.findUnique.mockResolvedValue(teacherEmail);
    mockPrismaService.student.findMany.mockResolvedValue([
      'student+1@gmail.com',
    ]);

    await expect(
      teacherService.register({
        teacher: teacherEmail,
        students: studentsEmail,
      }),
    ).rejects.toThrow('Students email not found');
  });

  it('should get common students', async () => {
    const teachersEmail = ['teacher+1@gmail.com'];
    mockPrismaService.teacher.findMany.mockResolvedValue([{ id: 1 }]);
    mockPrismaService.$queryRaw.mockResolvedValue([
      { email: 'student+1@gmail.com' },
    ]);

    const result = await teacherService.getCommonStudents({
      teacher: teachersEmail,
    });

    expect(result).toEqual({
      students: ['student+1@gmail.com'],
    });
  });

  it('should throw an error when teachers do not exist', async () => {
    mockPrismaService.teacher.findMany.mockResolvedValue(['test+1@gmail.com']);

    await expect(
      teacherService.getCommonStudents({
        teacher: ['test+1@gmail.com', 'test+2@gmail.com'],
      }),
    ).rejects.toThrow('Teachers email not found');
  });

  it('should suspend a student', async () => {
    mockPrismaService.student.findUnique.mockResolvedValue({ id: 1 });
    mockPrismaService.student.update.mockResolvedValue({ id: 1 });

    const result = await teacherService.suspend({
      student: 'student+1@gmail.com',
    });

    expect(result).toEqual(undefined);
  });

  it('should throw an error when student does not exist', async () => {
    mockPrismaService.student.findUnique.mockResolvedValue(null);

    await expect(
      teacherService.suspend({
        student: 'test+1@gmail.com',
      }),
    ).rejects.toThrow('Student email not found');
  });

  it('should retrieve students in database', async () => {
    mockPrismaService.teacher.findUnique.mockResolvedValue({ id: 1 });
    mockPrismaService.student.findMany.mockResolvedValue([
      { id: 1, email: 'student+1@gmail.com' },
    ]);

    const result = await teacherService.retrieveNotifications({
      teacher: 'teacher+1@gmail.com',
      notification: 'Hello students!',
    });

    expect(result).toEqual({
      recipients: ['student+1@gmail.com'],
    });
  });

  it('should throw an error when teacher does not exist', async () => {
    mockPrismaService.teacher.findUnique.mockResolvedValue(null);

    await expect(
      teacherService.retrieveNotifications({
        teacher: 'test+1@gmail.com',
        notification: 'Hello students!',
      }),
    ).rejects.toThrow('Teacher email not found');
  });

  it('should return valid email addresses', () => {
    const notification = `Hello
      @@${studentsEmail[1]}@
      @${studentsEmail[0]}
      @not.an.email@com
      @invalid.email.com
      @short.domain@gmail.c
      @in#valid@gmail.com
      `;

    expect(teacherService.extractEmails(notification)).toEqual(
      new Set(studentsEmail),
    );
  });
});
