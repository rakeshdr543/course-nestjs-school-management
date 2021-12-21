import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    await this.studentRepository.save(student);
    return student;
  }

  async getAllStudents(): Promise<Student[]> {
    const students = await this.studentRepository.find();
    return students;
  }

  async getSingleStudent(id: string): Promise<Student> {
    const student = await this.studentRepository.findOne({ id });
    return student;
  }

  async getManyStudents(studentIds: string[]) {
    const students = await this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
    return students;
  }
}
