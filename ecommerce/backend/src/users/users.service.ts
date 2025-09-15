import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import e from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async findMe(token: string) {
    try {
      const decodedToken = await this.jwtService.verifyAsync(token);

      const user = await this.prisma.user.findUnique({
        where: { id: decodedToken.sub },
        omit: { providerId: true }
      });
      
      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async getUserBalance(token: string) {
    try {
      const decodedToken = await this.jwtService.verifyAsync(token);

      const user = await this.prisma.user.findUnique({
        where: { id: decodedToken.sub },
        select: { score: true },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async postUserCredit(token: string, amount: number, roundId: number) {
    try {
      const decodedToken = await this.jwtService.verifyAsync(token);

      const user = await this.prisma.user.findUnique({
        where: { id: decodedToken.sub },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }
      if (amount <= 0) {
        throw new UnauthorizedException("Amount must be greater than zero");
      }
      const newBalance = await this.prisma.user.update({
        where: { id: user.id },
        data: { score: user.score + amount },
      });
      
      await this.prisma.logs.create({
        data: {
          userId: user.id,
          message: `User credited ${amount}`,
          roundId: roundId,
          value: amount,
        },
      });

      return newBalance;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async postUserDebit(token: string, amount: number, orderId: number) {
    try {
      const decodedToken = await this.jwtService.verifyAsync(token);

      const user = await this.prisma.user.findUnique({
        where: { id: decodedToken.sub },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }
      if (amount <= 0) {
        throw new UnauthorizedException("Amount must be greater than zero");
      }
      if (user.score - amount < 0) {
        throw new UnauthorizedException("Insufficient balance");
      }
      const newBalance = await this.prisma.user.update({
        where: { id: user.id },
        data: { score: user.score - amount },
      });
      await this.prisma.logs.create({
        data: {
          userId: user.id,
          message: `User debited ${amount}`,
          orderId: orderId,
          value: -amount,
        },
      });
      return newBalance;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async getLogs(token: string) {
    try {
      const decodedToken = await this.jwtService.verifyAsync(token);

      const user = await this.prisma.user.findUnique({
        where: { id: decodedToken.sub },
      });
      
      if (!user) {
        throw new NotFoundException("User not found");
      }

      const logs = await this.prisma.logs.findMany({
        where: { userId: user.id },
      });

      return logs;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
