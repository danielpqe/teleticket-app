import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from './logger.service';

const loggerHeader = 'x-logger-id';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const loggerId = randomUUID();

    req[loggerHeader] = loggerId;
    res.setHeader(loggerHeader, loggerId);

    const requestDetail = {
      method: req.method,
      path: req.path,
      hearders: req.headers,
      body: req.body,
      params: req.params,
    };

    this.loggerService.create({
      logger_id: loggerId,
      request_detail: JSON.stringify(requestDetail),
    });

    next();
  }
}
