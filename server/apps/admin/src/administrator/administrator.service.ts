/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-16 10:14:38
 * @LastEditTime: 2021-08-09 11:07:01
 * @Description: Modify here please
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Admin } from 'libs/db/models/admin.model';
import { InjectModel } from 'nestjs-typegoose';
import { TableResponseResult } from '../BaseResponseResult';
import { addAdminDto } from './Dto/addAdminDto';
import { editAdminDto } from './Dto/editAdminDto';
import { getAdminDto } from './Dto/getAdminListDto';

@Injectable()
export class AdministratorService {
  constructor(
    @InjectModel(Admin) private adminModel: ReturnModelType<typeof Admin>,
  ) {}

  // 管理员列表
  async getAdminList(getAdminQuery: getAdminDto):Promise<TableResponseResult<Admin>>{
    const { pageNumber, pageSize, name } = getAdminQuery;
    const total = await this.adminModel.countDocuments();
    const info = await this.adminModel
      .find({ name: { $regex: new RegExp(name, 'i') } })
      .limit(~~(pageSize || 10))
      .populate('roleIds')
      .skip(~~((pageNumber - 1) * pageSize))
      .exec();
      return {
          items: info,
          total,
      }
  }

  // 创建管理员
  async createAdmin(addAdminForm: addAdminDto):Promise<Admin> {
    const isHasEmail = await this.adminModel.findOne({
      email: addAdminForm.email,
    });
    if (isHasEmail) {
      throw new HttpException('邮箱已经存在！', HttpStatus.OK);
    }
    const info = await this.adminModel.create(addAdminForm as any);
    if (!info) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }

    return info;
  }

  /**
   * 更新管理员信息
   */

  async updateAdmin(editAdminForm: editAdminDto, id: string): Promise<Admin> {
    const isHasEmail = await this.adminModel.findOne({
      email: editAdminForm.email,
    });
    if (isHasEmail._id != id) {
      throw new HttpException('邮箱已经存在！', HttpStatus.OK);
    }

    const result = await this.adminModel.findByIdAndUpdate(
      id,
      editAdminForm as any,
    );

    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }

    return result;
  }

  /**
   * 删除管理员
   */

  async deleteAdmin(id: string):Promise<any>{
    // 检查是否为超级管理员
    const isSuper = await this.adminModel.findOne({ _id: id, isSuper: true });
    if (isSuper) {
      throw new HttpException('此账号为高级权重，不能删除！', HttpStatus.OK);
    }
    const result = await this.adminModel.deleteOne({ _id: id });
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }

    return result;
  }

  // 改变管理员状态
  async changeAdminStatus(id: string, status: boolean):Promise<Admin> {
    const isSuper = await this.adminModel.findOne({ _id: id, isSuper: true });
    if (isSuper) {
      throw new HttpException('不能禁用高权重账号', HttpStatus.OK);
    }
    const result = await this.adminModel.findByIdAndUpdate(id, { status });
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }
    return result;
  }
}
