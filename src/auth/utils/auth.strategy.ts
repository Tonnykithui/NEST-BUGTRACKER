import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport';

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:'Thisismysecretkey'
        })
    }

    async validate(payload:any){
        const user = { userId:payload.sub, email:payload.email, role:payload.role }
        console.log(user);
        return user;
    }
}