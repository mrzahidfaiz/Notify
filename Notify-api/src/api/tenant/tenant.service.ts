import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tenant } from 'src/schemas/tenant.schema';
import { Model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { changePasswordDto } from './dto/change-password.dto';
import { User } from 'src/schemas/user.schema';
import { Role } from 'src/schemas/role.schema';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name) private tenantModel: Model<Tenant>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    const { email, password } = createTenantDto;
    const EmailInUse = await this.tenantModel.exists({ email });
    if (EmailInUse) {
      throw new UnauthorizedException('Email already in use');
    }
    const hashedPassword = await hash(password, +process.env.SALT_VALUE);
    const newTenant = await this.tenantModel.create({
      ...createTenantDto,
      password: hashedPassword,
    });
    newTenant.password = undefined;
    return newTenant;
  }
  async changePassword(passwords: changePasswordDto, userId) {
    const { newPassword, password } = passwords;
    const hashedNewPassword = await hash(newPassword, +process.env.SALT_VALUE);
    const tenant = await this.tenantModel.findById(userId);
    if (!tenant) {
      const user = await this.userModel.findById(userId);
      const isPassword = await compare(password, user.password);
      if (isPassword) {
        await this.tenantModel.findByIdAndUpdate(userId, {
          password: hashedNewPassword,
        });
        return 'Password changed successfully';
      }
    } else if (tenant) {
      const isPassword = await compare(password, tenant.password);
      if (isPassword) {
        await this.tenantModel.findByIdAndUpdate(userId, {
          password: hashedNewPassword,
        });
        return 'Password changed successfully';
      }
    }
    throw new UnauthorizedException('Incorrect Password');
  }

  async findOneTenantByEmail(email: string) {
    const tenant = await this.tenantModel.findOne({ email });
    if (!tenant) {
      return null;
    }
    return tenant;
  }

  async findOneTenantById(id: any) {
    let tenantId: any;
    const { payload } = id;
    if (payload != undefined) {
      tenantId = payload;
    } else {
      tenantId = id;
    }
    const tenant = await this.tenantModel.findById(tenantId).populate('roles');
    if (!tenant) {
      return null;
    }
    tenant.password = undefined;
    return tenant;
  }

  async getUsers(id) {
    const users = await this.userModel.find({ tenantId: id }).populate('roles');
    if (users.length === 0) {
      throw new HttpException('Users Not Found', HttpStatus.NOT_FOUND);
    }
    return users;
  }
  async deleteUser(tenantId, userId) {
    const deletedUser = await this.userModel.findOneAndDelete({
      tenantId: tenantId,
      _id: userId,
    });
    if (!deletedUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException(
      `${deletedUser.email} Successfully Deleted`,
      HttpStatus.OK,
    );
  }

  async editUser(tenantId, userId, data) {
    let hashedPassword;
    if (data.password) {
      hashedPassword = await hash(data.password, +process.env.SALT_VALUE);
    }
    const editedUser = await this.userModel
      .findOneAndUpdate(
        { tenantId: tenantId, _id: userId },
        {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          roles: data.roles,
        },
        { new: true },
      )
      .populate('roles');
    if (!editedUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    editedUser.password = undefined;
    return editedUser;
  }
}
