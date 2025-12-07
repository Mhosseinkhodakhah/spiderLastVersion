import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(){}
  private readonly jwt : JwtService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('its hereeeeee')
    const request = context.switchToHttp().getRequest();
    // console.log('its hereeeeee' , request)
    const apiKey = request.headers;
    console.log('its hereeeeee' , apiKey.authorization)
    console.log('its hereeeeee' , apiKey)
    if (apiKey && apiKey.authorization) {
      try {
        let token = apiKey.authorization.split(' ')[1]
        console.log('its token' , token)
        let decode = this.jwt.verify(token.trim())
        request.user = decode
        return true;
      } catch (error) {
        return false
      }
    }else{
      return false
    }
  }
}
