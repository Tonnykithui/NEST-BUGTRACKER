import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, Roles } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/utils/auth.guard';
import { RolesGuard } from 'src/auth/utils/auth.decorator';
import { getUser } from 'src/auth/utils/user.param';

@UseGuards(JwtAuthGuard)
@RolesGuard(Roles.Developer, Roles.Admin, Roles.Manager)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //OL
  @Get()
  findOne(@getUser() user) {
    return this.usersService.findOne(user.userId);
  }

  //OL
  @Post()
  update(@getUser() user, @Body() updateUserDto: Partial<UpdateUserDto>) {
    return this.usersService.update(user.userId, updateUserDto);
  }

  //OL
  @Delete()
  remove(@getUser() user) {
    return this.usersService.remove(user.userId);
  }
}
