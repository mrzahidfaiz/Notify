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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create.role.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { Role } from 'src/roles/role.enum';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Roles(Role.CREATE_NEW_ROLE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('createRole')
  async CreateRole(@Body() role: CreateRoleDto, @Req() req) {
    let id: any;
    const { user } = req;
    if (user.tenantId === undefined) {
      id = user._id;
    } else {
      id = user.tenantId;
    }
    return this.rolesService.createRole(role, id);
  }

  @Roles(Role.VIEW_ROLES)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('getRoles')
  async GetRoles(@Req() req) {
    let id: any;
    const { user } = req;
    if (user.tenantId === undefined) {
      id = user._id;
    } else {
      id = user.tenantId;
    }
    return this.rolesService.getRoles(id);
  }

  @Roles(Role.DELETE_ROLE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('deleteRole/:id')
  async DeleteRole(@Param('id') id, @Req() req) {
    let tenantId: any;
    const { user } = req;
    if (user.tenantId === undefined) {
      tenantId = user._id;
    } else {
      tenantId = user.tenantId;
    }
    return this.rolesService.deleteRole(tenantId, id);
  }

  @Roles(Role.EDIT_ROLE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('editRole/:id')
  async EditRole(@Param('id') id, @Req() req, @Body() data: CreateRoleDto) {
    let tenantId: any;
    const { user } = req;
    if (user.tenantId === undefined) {
      tenantId = user._id;
    } else {
      tenantId = user.tenantId;
    }
    return this.rolesService.editRole(tenantId, id, data);
  }
}
