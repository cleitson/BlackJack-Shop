import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserCredit, UserDebit } from './dto/user.dto';

@Controller('user')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  @ApiOperation({summary: "all details from users / need token jwt"})
  findMe(@Req() req) {

    const token = req.headers.user;

    return this.usersService.findMe(token);

  }


  @Get('/balance')
  @ApiOperation({summary: "only the user's balance / need token jwt"})
  getUserBalance(@Req() req) {

    const token = req.headers.user;

    return this.usersService.getUserBalance(token);

  }
  @Post('/credit')
  @ApiOperation({summary: "Add funds to user from blackjack / need token jwt"})
  postUserCredit(@Req() req, @Body() data: UserCredit) {

    const token = req.headers.user;

    return this.usersService.postUserCredit(token, data);

  }
  @Post('/debit')
  @ApiOperation({summary: "Remove funds to user from ecommerce / need token jwt"})
  postUserDebit(@Req() req, @Body() data: UserDebit) {

    const token = req.headers.user;

    return this.usersService.postUserDebit(token, data);

  }

  @Get('/logs')
  @ApiOperation({summary: "All logs that change balance from user's / need token jwt"})
  getLogs(@Req() req) {

    const token = req.headers.user;

    return this.usersService.getLogs(token);
    
  }
}
