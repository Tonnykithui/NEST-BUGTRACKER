import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto, Roles } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService:UsersService,
    private jwtService:JwtService
    ){}

  async register(createAuthDto: CreateAuthDto) {
    if(!createAuthDto.FirstName || !createAuthDto.LastName || !createAuthDto.Email 
      || !createAuthDto.Password || !createAuthDto.ConfirmPassword){
        throw new HttpException('Fill all fields', HttpStatus.BAD_REQUEST);
      }

    if(createAuthDto.Password !== createAuthDto.ConfirmPassword){
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    const userExists = await this.userService.findUser(createAuthDto.Email);

    if(userExists) throw new HttpException('User already exists, change email', HttpStatus.BAD_REQUEST);

    createAuthDto.Role = [Roles.Developer];

    const rounds = 10;
    const hashedPassword = await bcrypt.hash(createAuthDto.Password, rounds);

    createAuthDto.Password = hashedPassword;

    const userRegistered = await this.userService.register(createAuthDto);

    const payload = { sub:userRegistered._id, email:userRegistered.Email, role:userRegistered.Role };
    const jwtToken = this.jwtService.sign(payload);

    return jwtToken;
  }

  async login(user:LoginAuthDto){
    const userExists = await this.userService.findUser(user.Email);
    if(!userExists) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const passwordCorrect = await bcrypt.compare(user.Password, userExists.Password);
    if(!passwordCorrect) throw new HttpException('Provide correct login credentials', HttpStatus.BAD_REQUEST);

    const payload = { sub:userExists._id, email:userExists.Email, role:userExists.Role };
    const jwtToken = this.jwtService.sign(payload);
    
    return jwtToken
  }
}
