import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt : JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers;
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
