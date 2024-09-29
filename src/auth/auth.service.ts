import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
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
}
