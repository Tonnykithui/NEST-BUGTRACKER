import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/auth.strategy';
import { RolesCheck } from './utils/roles.check';

@Module({
  imports:[UsersModule, 
    JwtModule.register({
      secret:'Thisismysecretkey',
      signOptions:{
        expiresIn:60*60*1
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesCheck]
})

export class AuthModule {}
