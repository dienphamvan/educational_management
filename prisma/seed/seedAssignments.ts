import { AssignmentStatus, Prisma, PrismaClient } from '@prisma/client';

export async function seedAssignments(prisma: PrismaClient) {
  const data: Prisma.AssignmentCreateManyInput[] = [
    {
      title: 'Math Quiz #1',
      description: 'Basic algebra problems',
      dueDate: '2025-03-20T23:59:59Z',
      status: AssignmentStatus.PENDING,
      createdBy: 'teacherken@gmail.com',
      teacherId: 1,
      studentId: 1,
    },
    {
      title: 'English Essay',
      description: '1000-word essay on Shakespeare',
      dueDate: '2025-03-15T23:59:59Z',
      status: AssignmentStatus.COMPLETED,
      submittedDate: '2025-03-14T10:30:00Z',
      grade: null,
      createdBy: 'teacherjoe@gmail.com',
      teacherId: 2,
      studentId: 1,
    },
    {
      id: 3,
      title: 'Science Report',
      description: 'Lab report on photosynthesis experiment',
      dueDate: '2025-03-05T23:59:59Z',
      status: AssignmentStatus.GRADED,
      submittedDate: '2025-03-04T16:45:00Z',
      grade: 'A-',
      feedback: 'Good analysis but needs more citations',
      createdBy: 'teacherken@gmail.com',
      teacherId: 1,
      studentId: 2,
    },
  ];

  await prisma.assignment.createMany({
    data,
    skipDuplicates: true,
  });
}
