export const mockPrismaService = {
  $queryRaw: jest.fn(),
  teacher: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  student: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  teacherStudent: {
    createMany: jest.fn(),
  },
};
