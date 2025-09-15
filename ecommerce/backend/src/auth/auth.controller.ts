import { Controller, Get, UseGuards, Req, Res } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {
    console.log("Iniciando autenticação com Google");
    // Inicia o fluxo de autenticação do Google
    // Não precisa retornar nada, pois o Passport redireciona automaticamente
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res) {
    if (!req.user) {
      throw new Error("Usuário não autenticado");
    }
    const token = `Bearer ${req.user}`;

    res.cookie("accessToken", token, {
      httpOnly: true, // Impede acesso via JavaScript
      secure: process.env.NODE_ENV === "production", // Use true em HTTPS/produção
      sameSite: "strict", // Protege contra CSRF
      maxAge: 60 * 60 * 1000, // Expira em 1 hora (ajuste conforme o JWT)
    });
    return res.redirect("http://localhost:3000");
  }
}
