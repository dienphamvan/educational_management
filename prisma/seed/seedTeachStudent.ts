import { PrismaClient } from '@prisma/client';

export async function seedTeachStudent(prisma: PrismaClient) {
  const teacher = await prisma.teacher.createMany({
    data: [
      {
        email: 'teacherken@gmail.com',
      },
      {
        email: 'teacherjoe@gmail.com',
      },
    ],
    skipDuplicates: true,
  });

  console.info(`Successful seed ${teacher.count} teachers`);

  const student = await prisma.student.createMany({
    data: [
      {
        email: 'studentjon@gmail.com',
      },
      {
        email: 'studenthon@gmail.com',
      },
      {
        email: 'commonstudent1@gmail.com',
      },
      {
        email: 'commonstudent2@gmail.com',
      },
      {
        email: 'student_only_under_teacher_ken@gmail.com',
      },
      {
        email: 'studentmary@gmail.com',
      },
      {
        email: 'studentbob@gmail.com',
      },
      {
        email: 'studentagnes@gmail.com',
      },
      {
        email: 'studentmiche@gmail.com',
      },
    ],
    skipDuplicates: true,
  });

  console.info(`Successful seed ${student.count} students`);
}
