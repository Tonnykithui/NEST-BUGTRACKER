import { Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { RolesGuard } from "src/auth/utils/auth.decorator";
import { JwtAuthGuard } from "src/auth/utils/auth.guard";
import { getUser } from "src/auth/utils/user.param";
import { Roles } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@UseGuards(JwtAuthGuard)
@RolesGuard(Roles.Admin, Roles.Manager)
@Controller('manager')
export class ManagerController{
    constructor(private userService:UsersService){}

    @Get(':id')
    async GetSingleUser(@Param('id') id:string){
        return await this.userService.findOne(id);
    }

    @Get()
    async GetAllUsers(){
        return await this.userService.findAll();
    }

    @Post('users/:id')
    async UpdateUser(@Param('id') id:string, updUserDto:Partial<UpdateUserDto>){
         return await this.userService.update(id, updUserDto);
    }

    @Delete(':id')
    async DeleteUser(@Param('id') id:string){
        return await this.userService.remove(id);
    }
}