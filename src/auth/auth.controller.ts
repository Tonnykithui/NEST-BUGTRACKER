import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { create } from 'domain';
import { AuthService } from './auth.service';
import { CreateAuthDto, Roles } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.register(createAuthDto); 
  }

  @Post('login')
  async login(@Body() loginAuthDto:LoginAuthDto){
    return await this.authService.login(loginAuthDto);
  }
}