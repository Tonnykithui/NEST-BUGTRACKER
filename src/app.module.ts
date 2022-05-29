import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, TicketsModule, ProjectsModule, AuthModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/ticketingdb')
  ],
  controllers: [AppController],
  providers: [AppService, UsersModule],
})
export class AppModule {}
