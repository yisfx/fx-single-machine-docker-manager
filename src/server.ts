import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SysConfig } from './conf/site.config';
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import fastify from 'fastify';
import { CSPInterceptor } from './framework/interceptor/csp.interceptor';
import { AllExceptionsFilter } from './framework/filter/exception-filter';
import * as log4js from "log4js";
import path from 'path';



//https://github.com/JeniTurtle/nestjs-fastify/blob/master/src/server.ts
async function bootstrap() {

  const instance = fastify({ bodyLimit: 10240000, maxParamLength: 180 })
  const adapter = new FastifyAdapter(instance);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter
  );

  app.useGlobalInterceptors(new CSPInterceptor())
  app.useGlobalFilters(
    new AllExceptionsFilter(),
  )


  log4js.configure({
    appenders: {
      allLog: { type: 'dateFile', filename: path.join(__dirname, "logs/log"), pattern: '-yyyy-MM-dd.log', alwaysIncludePattern: true },
      console: { type: "console" },
    },
    categories: { default: { appenders: ["allLog"], level: "error" } }
  })
  const logger = log4js.getLogger();


  process.on("uncaughtException", (err: Error) => {
  
    logger.error(err)
  });

  await app.listen(SysConfig.port, "0.0.0.0", (error, address) => {
    if (error) {
      console.log(error);
      process.exit(1)
    }
    else {
      logger.log("listen at", SysConfig.port)
      console.log("listen at", SysConfig.port);
    }
  });
}

bootstrap();
