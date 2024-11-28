import {
  Body,
  Controller,
  Post,
  Req,
  Put,
  UseGuards,
  Param,
  Res,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRegisterDto } from './dto/user-register.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { updatePasswordDto } from './dto/update-password.dto';
import { TenantService } from '../tenant/tenant.service';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly tenantService: TenantService,
    private readonly authService: AuthService,
  ) {}

  @Roles(Role.CREATE_NEW_USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('register')
  register(@Body() registerData: UserRegisterDto, @Req() req) {
    let tenantId: any;
    const { user } = req;
    if (user.tenantId === undefined) {
      tenantId = user._id;
    } else {
      tenantId = user.tenantId;
    }
    return this.userService.register(registerData, tenantId);
  }

  @Roles(Role.CHANGE_PASSWORD)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('updatePassword')
  async updatePassword(@Body() data: updatePasswordDto) {
    return this.userService.updatePassword(data);
  }

  @Roles(Role.IMPERSONATION)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(200)
  @Post('impersonation/:id')
  async GetImpersonation(@Req() req, @Param('id') impId: string, @Res() res) {
    const { user } = req;
    const impUser = await this.userService.getImpersonation(user._id, impId);
    if (impUser) {
      const accessToken = this.authService.getCookieWithJwtToken(impId);
      res.setHeader('Set-Cookie', accessToken);
    }
    return res.send(impUser);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('undoImpersonation/:id')
  async UndoImpersonation(@Param('id') impId: string, @Res() res) {
    const impUser = await this.authService.findById(impId);
    if (impUser) {
      const accessToken = await this.authService.getCookieWithJwtToken(impId);
      res.setHeader('Set-Cookie', accessToken);
    }
    return res.send(impUser);
  }
}
