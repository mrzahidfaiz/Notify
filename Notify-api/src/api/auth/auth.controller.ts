import {
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  login(@Req() req, @Res() res) {
    const { user } = req;
    const accessToken = this.authService.getCookieWithJwtToken(user._id);
    res.setHeader('Set-Cookie', accessToken);
    user.password = undefined;
    return res.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('logout')
  async logout(@Req() req) {
    req.res.setHeader('Set-Cookie', this.authService.getCookieForLogout());
  }
}
