import { Prisma, PrismaClient } from '@prisma/client';

export async function seedTeachersAndStudents(prisma: PrismaClient) {
  await prisma.teacher.createMany({
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

  const studentsEmail: Prisma.StudentCreateManyInput['email'][] = [
    'studentjon@gmail.com',
    'studenthon@gmail.com',
    'commonstudent1@gmail.com',
    'commonstudent2@gmail.com',
    'student_only_under_teacher_ken@gmail.com',
    'studentmary@gmail.com',
  ];

  await prisma.student.createMany({
    data: studentsEmail.map((email) => ({ email })),
    skipDuplicates: true,
  });

  console.log('Seeded teachers and students');
}
