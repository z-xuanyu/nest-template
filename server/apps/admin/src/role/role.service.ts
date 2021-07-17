import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Role } from 'libs/db/models/role.model';
import { InjectModel } from 'nestjs-typegoose';
import { addRoleDto } from './Dto/addRoleDto';
import { getRoleListDto } from './Dto/getRoleListDto';
import { editRoleDto } from './Dto/updateRoleDto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private roleModel: ReturnModelType<typeof Role>,
  ) {}

  /**
   * 获取角色列表
   */
  async getRoleList(getRoleQuery: getRoleListDto) {
    const { pageNumber, pageSize } = getRoleQuery;
    const info = await this.roleModel
      .find()
      .limit(Number(pageSize || 10))
      .populate('roleIds')
      .skip(Number((pageNumber - 1) * pageSize))
      .exec();
    return info;
  }

  /**
   * 添加角色
   */
  async addRole(addRoleForm: addRoleDto) {
    const result = await this.roleModel.create(addRoleForm as any);
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }
    return result;
  }

  /**
   * 获取角色详细信息
   */
  async getRoleInfo(id: string) {
    const result = await this.roleModel
      .findById({ _id: id })
      .populate('menuIds');

    return result;
  }

  /** 
   * 更新角色信息 
   */
  async updateRole(editRoleForm: editRoleDto, id: string) {
    const result = await this.roleModel.findByIdAndUpdate(
      id,
      editRoleForm as any,
    );
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }
    return result;
  }



  /** 
   * 删除角色 
   */
  async delRole(id:string) {
    const result = await this.roleModel.findByIdAndDelete(id)
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }
    return result;
  }
}
