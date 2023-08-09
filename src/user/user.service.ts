import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { createUserDto } from "./dto/createUser.dto";
@Injectable()
export class UserService{
    //constructor(private readonly){}
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}
      async createUser(dto: createUserDto) {
        try {
          const existingUser = await this.userRepository.findOne({ where: { email: dto.email } });
      
          if (existingUser) {
            // A user with the provided email already exists
            throw new Error('User with this email already exists');
          }
      

          const newUser = this.userRepository.create(dto);
          const createdUser = await this.userRepository.save(newUser);
      
          return createdUser; // Return the created user
      
        } catch (error) {
          // Handle any errors that might occur during the database query or creation process
          throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      
}