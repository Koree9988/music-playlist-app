import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EnvironmentConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import { UtilsService } from './utils.service';
import { AuthGuard } from './guard.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ContextService } from './context.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
// import { ContextService } from './context.service';
// import { UserModule } from 'src/user/user.module';
// import { Auth0Module } from 'src/auth0/auth0.module';

@Global()
@Module({
  // imports: [ConfigModule, JwtModule, Auth0Module],
  imports: [ConfigModule, JwtModule, UserModule],
  providers: [
    ContextService,

    PrismaService,
    EnvironmentConfigService,
    UtilsService,
    UserService,
    AuthGuard,
    JwtService,
  ],
  exports: [
    ContextService,
    PrismaService,
    EnvironmentConfigService,
    UtilsService,
    UserService,
    AuthGuard,
    JwtService,
  ],
})
export class CoreModule {}
