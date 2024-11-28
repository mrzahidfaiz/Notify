import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TenantService } from '../tenant/tenant.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tenantService: TenantService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async validater(email: string, password: string) {
    const tenant = await this.tenantService.findOneTenantByEmail(email);
    if (!tenant) {
      const user = await this.userService.findOneUserByEmail(email);
      await this.verifyPassword(password, user.password);
      if (user) return user;
    }
    await this.verifyPassword(password, tenant.password);

    if (tenant) return tenant;

    return null;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isMatched = await compare(plainTextPassword, hashedPassword);
    if (!isMatched) throw new UnauthorizedException('Invalid Credentials');
  }

  public getCookieWithJwtToken(tenantId: string) {
    const payload = tenantId;
    const token = this.jwtService.sign({ payload });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'MAX_AGE',
    )}`;
  }

  public getCookieForLogout() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  async findById(payload) {
    const tenant = await this.tenantService.findOneTenantById(payload);
    if (!tenant) {
      const user = await this.userService.findOneUserById(payload);
      return user;
    }

    return tenant;
  }
}
