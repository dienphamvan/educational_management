import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetCommonStudentsRequestDto } from './dto/get-common-students-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RetrieveNotificationsDto } from './dto/retrieve-notifications-request.dto';
import { SuspendRequestDto } from './dto/suspend-request.dto';
import { GetAssignmentRequestDto } from './dto/get-assignment-request.dto';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async register(data: RegisterRequestDto) {
    const { teacher: teacherEmail, students: studentsEmail } = data;

    const teacherData = await this.prisma.teacher.findUnique({
      where: {
        email: teacherEmail,
      },
    });

    if (!teacherData) {
      throw new BadRequestException('Teacher email not found');
    }

    const studentsData = await this.prisma.student.findMany({
      where: {
        email: {
          in: studentsEmail,
        },
      },
    });

    if (studentsData.length !== studentsEmail.length) {
      throw new BadRequestException('Students email not found');
    }

    await this.prisma.teacherStudent.createMany({
      data: studentsData.map((data) => ({
        studentId: data.id,
        teacherId: teacherData.id,
      })),
      skipDuplicates: true,
    });
  }

  async getCommonStudents(query: GetCommonStudentsRequestDto) {
    const { teacher } = query;

    const teachersData = await this.prisma.teacher.findMany({
      where: {
        email: {
          in: teacher,
        },
      },
    });

    if (teacher.length !== teachersData.length) {
      throw new BadRequestException('Teachers email not found');
    }

    const ids = teachersData.map((data) => data.id);

    const dataRaw: { email: string }[] = await this.prisma.$queryRaw`
      select s.email from student s 
      join teacher_student ts on s.id = ts.studentId
      where ts.teacherId in (${Prisma.join(ids)})
      group by s.id 
      having count(s.id) = ${teachersData.length}
    `;

    return { students: dataRaw.map((data) => data.email) };
  }

  async suspend(data: SuspendRequestDto) {
    const studentData = await this.prisma.student.findUnique({
      where: {
        email: data.student,
        isSuspend: false,
      },
    });

    if (!studentData) {
      throw new BadRequestException(
        'Student email not found or already suspended',
      );
    }

    await this.prisma.student.update({
      where: {
        id: studentData.id,
      },
      data: {
        isSuspend: true,
      },
    });
  }

  async retrieveNotifications(data: RetrieveNotificationsDto) {
    const { teacher: teacherEmail, notification } = data;

    const teacherData = await this.prisma.teacher.findUnique({
      where: {
        email: teacherEmail,
      },
    });

    if (!teacherData) {
      throw new BadRequestException('Teacher email not found');
    }

    const studentsInNotification = this.extractEmails(notification);

    const studentsData = await this.prisma.student.findMany({
      where: {
        OR: [
          {
            teacherStudents: {
              some: {
                teacherId: teacherData.id,
              },
            },
          },
          {
            email: {
              in: Array.from(studentsInNotification),
            },
          },
        ],
      },
    });

    const noticeStudents = new Set(studentsData.map((data) => data.email));

    return {
      recipients: Array.from(noticeStudents),
    };
  }

  extractEmails(notification: string) {
    const studentsInNotification = new Set<string>();

    const regex = /@([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    notification.match(regex)?.forEach((str) => {
      studentsInNotification.add(str.slice(1));
    });

    return studentsInNotification;
  }

  async getAssignments(query: GetAssignmentRequestDto) {
    const assignments = await this.prisma.assignment.findMany({
      where: {
        status: query.status,
        student: {
          email: {
            in: query.student,
          },
        },
      },

      omit: {
        studentId: true,
        teacherId: true,
      },
    });
    return assignments;
  }
}
