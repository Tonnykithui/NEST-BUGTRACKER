import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>){}

  async create(createProjectDto: CreateProjectDto, user) {
    if(!createProjectDto.Title || !createProjectDto.Description){
      throw new HttpException("Please provide full project details", HttpStatus.BAD_REQUEST);
    }

    createProjectDto.Creator = user.userId;

    const project = await new this.projectModel(createProjectDto);

    return project.save();
  }

  async findAll() {
    try{
      const projects = await this.projectModel.find();
      return projects;
    } catch(e)
    {
      throw e;
    }
  }

  async findOne(id: string) {
    const project = await this.projectModel.findById(id);
    if(project){
      return project;
    } else {
      return `Project with id ${id} does not exists`;
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  async remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
