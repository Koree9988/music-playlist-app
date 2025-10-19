/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

// import { EnvironmentConfigService } from './config.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    this.logger.log('Connecting to PostgreSQL.');
    await this.$connect();
    this.logger.log('Connected to PostgreSQL!');

    const focusTable = ['user'];

    this.$use(async (params, next) => {
      // if (params.action == 'delete') {
      //   // Delete queries
      //   // Change action to an update
      //   params.action = 'update';
      //   params.args['data'] = { deletedAt: new Date() };
      // }
      // if (params.action == 'deleteMany') {
      //   // Delete many queries
      //   params.action = 'updateMany';
      //   if (params.args.data != undefined) {
      //     params.args.data['deleted'] = new Date();
      //   } else {
      //     params.args['data'] = { deletedAt: new Date() };
      //   }
      // }

      if (
        params.action == 'findFirst' ||
        params.action == 'findMany' ||
        params.action == 'findUnique'
      ) {
        if (params.action == 'findUnique') {
          params.action = 'findFirst';
        }

        // Delete queries
        // Change action to an update
        // if (focusTable.includes(params.model)) {
        //   if (params.args.where?.deletedAt != undefined) {
        //     params.args.where['deletedAt'] = null;
        //   }
        // }
      }

      return next(params);
    });

    // this.$on('query' as any, (e: any) => {
    //   const duration = `${e.duration} ms`;
    //   const msg = duration + ' ' + e.query;

    //   if (e.duration < 200) {
    //     this.logger.log(msg);
    //   } else {
    //     this.logger.warn(msg);
    //   }
    // });
    (this as any).$on('query', (e: any) => {
      const duration = `${e.duration} ms`;
      const msg = duration + ' ' + e.query;

      if (e.duration < 200) {
        this.logger.log(msg);
      } else {
        this.logger.warn(msg);
      }
    });

    // this.$on('query' as any, (e: any) => {
    //   const duration = `${e.duration} ms`;
    //   const msg = duration + ' ' + e.query;

    //   if (e.duration < 200) {
    //     this.logger.log(msg);
    //   } else {
    //     this.logger.warn(msg);
    //   }
    // });
  }

  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async () => {
  //     await app.close();
  //   });
  // }

  async enableShutdownHooks(app: INestApplication) {
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
}

export type PrismaTransaction = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
