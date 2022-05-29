import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { LoginAuthDto } from 'src/auth/dto/update-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
  
  async register(createUserDto: CreateUserDto) {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async findUser(email:string){
    return await this.userModel.findOne({Email:email});
  }

  async findUserById(id:string){
    try{
      const userExists = await this.userModel.findById({_id:id}, {Password:false});
      return userExists;
    } catch(e){
      throw e;
    }
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.findUserById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const userExists = await this.findUserById(id);
    if(userExists){
      await this.userModel.findByIdAndRemove(id);
      return 'User deleted'
    }
    else {
      return 'User does not exists';
    }
  }
}
