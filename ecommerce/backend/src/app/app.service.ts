import { Injectable } from '@nestjs/common';
import { ResponseAppDto } from './dto/response-app.dto';

@Injectable()
export class AppService {
  getHello(): ResponseAppDto {
    return { status: 'ok', message: 'API is running' };
  }
}
