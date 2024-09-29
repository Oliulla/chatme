import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async signup(dto: SignupDto) {
    const data = await this.userModel.create(dto);

    return data;
  }

  async signin(dto: SigninDto) {
    const data = await this.userModel.findOne({ username: dto?.username });
    return data;
  }

  async findSpecificUser(id: string) {
    const user = await this.userModel.findOne({ _id: new Types.ObjectId(id) });

    let sendUserbasedData = [];

    if (user?.subordinates?.length > 0 && user?.role === 'MS') {
      sendUserbasedData = await Promise.all(
        user.subordinates.map(async (subordinate) => {
          return await this.userModel.findOne({ _id: subordinate });
        }),
      );
    } else {
      sendUserbasedData = await this.userModel.find({ _id: user.supervisor });
    }

    return sendUserbasedData;
  }
}
