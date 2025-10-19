import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface JwtConfig {
  access_secret: string;
  access_expire_time: string;
  refresh_secret: string;
  refresh_expire_time: string;
}

interface AppConfig {
  database: string;
  image_base?: string;
  port?: number;
  // jwt: JwtConfig;
}

@Injectable()
export class EnvironmentConfigService {
  private readonly _config: AppConfig;

  constructor(private readonly configSrv: ConfigService) {
    this._config = {
      database: this.getEnv<string>('DATABASE_URL'),
      port: this.getEnv<number>('PORT'),
    };
  }

  private getEnv<T>(key: string): T {
    const value = this.configSrv.get<T>(key);
    if (value === undefined || value === null) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }

  get config(): AppConfig {
    return this._config;
  }
}
