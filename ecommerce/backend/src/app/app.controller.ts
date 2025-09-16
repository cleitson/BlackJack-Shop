import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseAppDto } from './dto/response-app.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller("health")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({summary: "check API status"})
  getHello(): ResponseAppDto {
    return this.appService.getHello();
  }
}
