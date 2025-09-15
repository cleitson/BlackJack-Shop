import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateGoogleUser(googleUser: any) {
    try {
      const { email, firstName, lastName, picture, providerId } = googleUser;

      if (!email || !providerId) {
        throw new Error("Email ou providerId não fornecidos");
      }

      let user = await this.prisma.user.findUnique({
        where: { providerId },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email,
            firstName,
            lastName,
            picture,
            provider: "google",
            providerId,
          },
        });
      }
      const payload = { email: user.email, sub: user.id };
      return this.jwtService.sign(payload);

    } catch (error) {
      throw new Error(`Erro ao validar usuário: ${error.message}`);
    }
  }

}
