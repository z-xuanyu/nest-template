import { Injectable, OnModuleInit } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Admin } from 'libs/db/models/admin.model';
import { Menu } from 'libs/db/models/menu.model';
import { Role } from 'libs/db/models/role.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class InitDbService implements OnModuleInit {
  constructor(
    @InjectModel(Admin) private adminModel: ReturnModelType<typeof Admin>,
    @InjectModel(Role) private roleModel: ReturnModelType<typeof Role>,
    @InjectModel(Menu) private menuModel: ReturnModelType<typeof Menu>,
  ) {}

  onModuleInit() {
    console.log('数据库初始化');
    this.init();
  }

  /**
   * 初始化数据
   */

  private async init() {
    
    /** 创建菜单 */
    // 父级菜单
    const menuInfo = {
      name: '系统管理',
      parentId: null,
      url: 'system',
      sort: 1,
      keepAlive: 0,
      componentName:'System',
      icon: 'ant-design:setting-outlined',
    };
    const menuRes = await this.menuModel.find();
    // 如果没有菜单数据，才执行初始化数据库
    if (!menuRes.length) {
      const menu1 = await this.menuModel.create(menuInfo as any);

      // 子级菜单
      const subMenuArr = [
        {
          name: '账号管理',
          parentId: menu1._id,
          url: 'system/account',
          sort: 1,
          componentName: 'Account',
          keepAlive: 0,
          icon: 'ant-design:user-outlined',
        },
        {
          name: '角色管理',
          parentId: menu1._id,
          url: 'system/role',
          componentName: 'Role',
          sort: 1,
          keepAlive: 0,
          icon: 'ant-design:gold-outlined',
        },
        {
          name: '菜单管理',
          parentId: menu1._id,
          url: 'system/menu',
          componentName: 'Menu',
          sort: 1,
          keepAlive: 0,
          icon: 'ant-design:menu-outlined',
        },
      ];

      for (const item of subMenuArr) {
        await this.menuModel.create(item);
      }

      /**
       * 创建角色
       */

      const allMenu = await this.menuModel.find();
      const roleInfo = {
        name: '超级管理员',
        description: '拥有所有角色',
        menuIds: allMenu.map(item => (item as any)._id),
      };

      const roleRes = await this.roleModel.create(roleInfo as any);

      /**
       * 创建账号
       */

      const accountInfo = {
        name: 'xuanyu',
        email: 'admin@qq.com',
        password: '123456',
        isSuper: true,
        roleIds: [roleRes._id],
      };

      await this.adminModel.create(accountInfo as any);
    }
  }
}
