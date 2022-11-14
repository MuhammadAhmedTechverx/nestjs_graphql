import { Injectable } from '@nestjs/common';
import { ProdService } from 'src/prod/prod.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class Test1Service {
  constructor(
    private userService: UserService,
    private prodService: ProdService,
  ) {}
  async testing(): Promise<any> {
    const check = await this.userService.findByEmail('ahmadxaman@gmail.com');
    return check;
  }
  async testing1(): Promise<any> {
    const check = await this.prodService.findOne('635fba39b1ae60cf3c46e32a');
    return check;
  }
}
