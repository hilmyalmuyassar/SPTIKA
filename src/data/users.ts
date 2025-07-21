import { User } from '../types/user';

// Mock user database with hashed passwords (simulated)
export const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    fullName: 'Hilmy Almuyassar',
    email: 'hilmy@gmail.com',
    password: '12345', // In production, this would be properly hashed
    studentId: 'ICT2024001',
    enrollmentYear: 2024,
    program: 'Information and Communication Technology',
    semester: 1,
    gpa: 3.85,
    profileImage: 'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '2',
    fullName: 'Aidi Abdurahman',
    email: 'aidiabdu@gmail.com',
    password: '172822', // In production, this would be properly hashed
    studentId: 'ICT2024002',
    enrollmentYear: 2024,
    program: 'Information and Communication Technology',
    semester: 1,
    gpa: 3.92,
    profileImage: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }
];