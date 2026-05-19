import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(nombre: string, email: string, pass: string) {
    // 1. Comprobar si el correo ya existe
    const existing = await this.usersRepository.findOne({ where: { email } });
    if (existing) throw new ConflictException('Este email ya está en uso');

    // 2. Encriptar la contraseña (hash)
    const passwordHash = await bcrypt.hash(pass, 10);
    
    // 3. Guardar el usuario en la base de datos
    const user = this.usersRepository.create({ nombre, email, passwordHash });
    await this.usersRepository.save(user);

    return { message: 'Usuario registrado con éxito', userId: user.id };
  }

  async login(email: string, pass: string) {
    // 1. Buscar al usuario
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    // 2. Comprobar contraseña
    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException('Credenciales incorrectas');

    // 3. Generar token (pasaporte)
    const payload = { sub: user.id, email: user.email, nombre: user.nombre };
    return {
      access_token: await this.jwtService.signAsync(payload),
      nombre: user.nombre
    };
  }
}
