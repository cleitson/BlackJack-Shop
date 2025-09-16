export class ResponseUserDto {
  id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
    picture: string | null;
    provider: string;
    score: number;
    createdAt: Date;
    updatedAt: Date;
}

export class UserBalanceDto {
  score: number;
}

export class UserLogDto {
  id: number;
    message: string;
    roundId: number | null;
    orderId: number | null;
    value: number;
    timestamp: Date;
    userId: number;
}