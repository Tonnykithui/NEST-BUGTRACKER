import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from '../dto/create-auth.dto';
import { ROLES_KEY } from './auth.decorator';

export class RolesCheck implements CanActivate{
    constructor(private reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])   

        if(!roles){
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        //console.log(user);

        return roles.some((role) => user.role?.includes(role));
    }
}