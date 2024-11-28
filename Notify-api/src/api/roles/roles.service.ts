import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/schemas/role.schema';
import { CreateRoleDto } from './dto/create.role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}

  async createRole(role, id: any) {
    const name = role.name;
    const tenantId = role.tenatId;
    const roleNameInUse = await this.roleModel.exists({ name, tenantId });
    if (roleNameInUse)
      throw new HttpException(
        'Role name already in use',
        HttpStatus.NOT_ACCEPTABLE,
      );
    const newRole = await this.roleModel.create({
      tenantId: id,
      ...role,
    });
    return newRole;
  }

  async getRoles(id: any) {
    const roles = await this.roleModel.find({ tenantId: id });
    if (roles.length === 0) {
      throw new HttpException('No Roles found.', HttpStatus.NOT_FOUND);
    }
    return roles;
  }

  async deleteRole(tenantId: any, id: any) {
    const deletedRole = await this.roleModel.findOneAndDelete({
      tenantId: tenantId,
      _id: id,
    });
    if (!deletedRole) {
      throw new HttpException('No Role found.', HttpStatus.NOT_FOUND);
    }
    throw new HttpException(
      `${deletedRole.name} Successfully Deleted`,
      HttpStatus.OK,
    );
  }

  async editRole(tenantId, id: String, data: CreateRoleDto) {
    const editedRole = await this.roleModel.findOneAndUpdate(
      { tenantId: tenantId, _id: id },
      { name: data.name, permissions: data.permissions },
      { new: true },
    );
    if (!editedRole) {
      throw new HttpException('No Role found.', HttpStatus.NOT_FOUND);
    }
    return editedRole;
  }
}
