import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { UserService } from '../user/user.service';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'asdfghgfdsasdfgfdsasdfghgfdsasdfghjhgfdsdfghuyewqwertytrewqwertytrewq123648529852352638413841536354',
    });
  }

  async validate(payload: any) {
    // const user = await this.usersService.findOne(payload.phone);
    // console.log('its payload of the token >>>> ' , payload)
    return payload
  }  
}

