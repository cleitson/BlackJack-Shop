import { ApiProperty } from "@nestjs/swagger";

export class UserCredit {

  @ApiProperty()
  amount: number;
  @ApiProperty()
  roundId: number;
}
export class UserDebit {

  @ApiProperty()
  amount: number;
  @ApiProperty()
  orderId: number;
}