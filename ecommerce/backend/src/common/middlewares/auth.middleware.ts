import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }
    const token = authHeader.split(' ')[1];
    if (!token || typeof token !== 'string') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.headers.user = token; // Adiciona o token ao objeto req para uso posterior
    next();
  }
}