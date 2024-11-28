import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { AnyARecord } from 'dns';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async register(registerData, userId) {
    const { email, password } = registerData;
    const emailInUse = await this.userModel.exists({ email });
    if (emailInUse) throw new ConflictException('Email already in use.');
    const hashedPassword = await hash(password, +process.env.SALT_VALUE);
    const newUser = await this.userModel.create({
      ...registerData,
      password: hashedPassword,
      tenantId: userId,
    });
    newUser.password = undefined;
    return newUser.populate('roles');
  }
  async updatePassword(data: any) {
    const { newPassword, userId } = data;
    const hashedNewPassword = await hash(newPassword, +process.env.SALT_VALUE);
    try {
      await this.userModel.findByIdAndUpdate(userId, {
        password: hashedNewPassword,
      });
      return 'Password changed successfully';
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneUserByEmail(email) {
    const user = await this.userModel
      .findOne({ email: email })
      .populate('roles');
    if (!user) throw new NotFoundException('Invalid email address.');
    return user;
  }

  async findOneUserById(id: any) {
    let userId: any;
    const { payload } = id;
    if (payload !== undefined) {
      userId = payload;
    } else {
      userId = id;
    }
    const user = await this.userModel.findById(userId).populate('roles');
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    user.password = undefined;
    return user;
  }

  async getImpersonation(userId: string, impId: string) {
    const user = await this.userModel.findById(impId).populate('roles');
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const impUser = {
      _id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles,
      tenantId: user.tenantId,
      impId: userId,
    };
    return impUser;
  }
}
