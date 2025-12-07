import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt : JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('its hereeeeee')
    const request = context.switchToHttp().getRequest();
    console.log('its hereeeeee' , request)
    const apiKey = request.headers;
    console.log('its hereeeeee' , apiKey.Authorization)
    if (apiKey && apiKey.Authorization) {
      try {
        let decode = this.jwt.verify(apiKey.Authorization)
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
