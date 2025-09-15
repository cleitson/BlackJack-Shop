import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  findMe(@Req() req) {
    const token = req.headers.user;
    return this.usersService.findMe(token);
  }


  @Get('/balance')
  getUserBalance(@Req() req) {
    const token = req.headers.user;
    return this.usersService.getUserBalance(token);
  }
  @Post('/credit')
  postUserCredit(@Req() req, @Body('amount') amount: number, @Body('roundId') roundId: number) {
    const token = req.headers.user;
    return this.usersService.postUserCredit(token, amount, roundId);
  }
  @Post('/debit')
  postUserDebit(@Req() req, @Body('amount') amount: number, @Body('orderId') orderId: number) {
    const token = req.headers.user;
    return this.usersService.postUserDebit(token, amount, orderId);
  }

  @Get('/logs')
  getLogs(@Req() req) {
    const token = req.headers.user;
    return this.usersService.getLogs(token);
  }
}
