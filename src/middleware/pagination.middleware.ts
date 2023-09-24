import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // get the pagination query parameters
    const page = req.query.page as string;
    const pageSize = req.query.pageSize as string;
    try {
      // check if params are alphanumeric
      if (page && isNaN(Number(page))) {
        throw new HttpException(
          'page must be a number',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (pageSize && isNaN(Number(pageSize))) {
        throw new HttpException(
          'pageSize must be a number',
          HttpStatus.BAD_REQUEST,
        );
      }

      // check if params are positive
      if (page && Number(page) < 1) {
        throw new HttpException(
          'page must be positive',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (pageSize && Number(pageSize) < 1) {
        throw new HttpException(
          'pageSize must be positive',
          HttpStatus.BAD_REQUEST,
        );
      }

      // set default values
      req.query.page = page ? page : '1';
      req.query.pageSize = pageSize ? pageSize : '10';
      next();
    } catch (error) {
      console.log(`Middleware error: ${error}`);
      next(error);
    }

    // check if params are valid
  }
}
