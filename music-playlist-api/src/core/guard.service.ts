/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
// import { Role } from '@prisma/client';
import { Request } from 'express';
import { EnvironmentConfigService } from './config.service';
import { ContextService } from './context.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(
  //   private readonly jwtSrv: JwtService,
  //   private readonly contextSrv: ContextService,
  //   // private readonly reflector: Reflector,
  //   private readonly userServ: UserService,
  //   // private readonly auth: Auth0Service,
  //   private readonly env: EnvironmentConfigService,
  // ) {}
  constructor(
    private readonly jwtSrv: JwtService,
    private readonly contextSrv: ContextService,
    private readonly userServ: UserService, // index [2]
    private readonly env: EnvironmentConfigService,
  ) {}

  // private readonly config = this.env.config;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return this.validateBearer(context);
    } catch (error) {
      return false;
    }
  }

  private async validateBearer(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    const decode = this.jwtSrv.decode(token);
    // const decode = await this.auth.getUserWithToken(token);

    if (!decode) throw new UnauthorizedException();
    // console.log('🚀  decode:', decode);
    // return true;
    // const ctx = context.getHandler();
    // const roles = this.reflector.get<string[]>(Roles.name, ctx);
    // if (
    //   decode.role !== Role.SUPER_ADMIN &&
    //   roles &&
    //   !roles.includes(decode.role)
    // ) {
    //   throw new ForbiddenException();
    // }

    // if (decode.role !== Role.SUB_SUPER_ADMIN) {
    //   const user = await this.userServ.findOne(decode.id);
    //   this.contextSrv.user = {
    //     id: user.id,
    //     username: user.username,
    //     email: user.email,
    //     status: user.status,
    //     role: decode.role,
    //   };
    //   return true;
    // }

    const user = await this.userServ.findOne(decode.id);
    if (!user) throw new UnauthorizedException();

    this.contextSrv.user = {
      id: user.id,
      name: user.name || undefined,
      email: user.email,
    };

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

// export const Roles = (...roles: Role[]) => SetMetadata(Roles.name, roles);
