import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegisterTenantDto } from '../auth/dto/register-tenant.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TenantService } from './tenant.service';
import { changePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterTenantDto) {
    return this.tenantService.create(registrationData);
  }

  @UseGuards(JwtAuthGuard)
  @Put('changePassword')
  async changePassword(@Body() passwords: changePasswordDto, @Req() req) {
    const { user } = req;
    return this.tenantService.changePassword(passwords, user._id);
  }

  @Roles(Role.VIEW_USERS)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('users')
  async GetUsers(@Req() req) {
    let id: any;
    const { user } = req;
    if (user.tenantId === undefined) {
      id = user._id;
    } else {
      id = user.tenantId;
    }
    return this.tenantService.getUsers(id);
  }

  @Roles(Role.EDIT_USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('editUser/:id')
  async EditUser(
    @Req() req,
    @Param('id') id,
    @Body() updateData: UpdateUserDto,
  ) {
    let tenantId: any;
    const { user } = req;
    if (user.tenantId === undefined) {
      tenantId = user._id;
    } else {
      tenantId = user.tenantId;
    }
    return this.tenantService.editUser(tenantId, id, updateData);
  }

  @Roles(Role.DELETE_USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('deleteUser/:id')
  async DeleteUser(@Req() req, @Param('id') id) {
    let tenantId: any;
    const { user } = req;
    if (user.tenantId === undefined) {
      tenantId = user._id;
    } else {
      tenantId = user.tenantId;
    }
    return this.tenantService.deleteUser(tenantId, id);
  }
}
