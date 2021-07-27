/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-27 15:59:39
 * @LastEditTime: 2021-07-27 16:17:46
 * @Description: Modify here please
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Admin } from 'libs/db/models/admin.model';
import { User } from 'libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';

@ApiTags('会员')
@Controller('user')
export class UserController {
    constructor(@InjectModel(User) private roleModel: ReturnModelType<typeof User>, @InjectModel(Admin) private adminModel: ReturnModelType<typeof Admin>){}
    

    @ApiOperation({ summary: '获取会员列表' })
    @Get()
    async getUserList(){
        const reslut = await this.roleModel.find()
        const adminList = await this.adminModel.find()
        return {
            code: 1,
            reslut,
            adminList
        }
    }
}
