import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join, resolve } from 'path';

const rootPath = resolve(process.cwd());
const defaultEnvFile = join(rootPath, '.env');

@Module({
  exports: [ConfigService],
  providers: [ConfigService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: defaultEnvFile,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production').required(),
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().required(),
      }),
    }),
  ],
})
export class AppConfigModule {}
