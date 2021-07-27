# 一 、介绍
## 聚成Nestjs+Mongodb+Jwt+Swagger 快速开发服务端接口API

# 二、使用

- 本项目仅仅是实现了rbac的权限系统,对于其他的功能需要自己基于这个基础上去扩展

- 项目使用的是Mongodb,请先安装本地的mongodb数据库，详细的安装教程可以百度搜索，非常简单，傻瓜式安装!

- 在项目的根目录的.env文件修改为你自己的数据库基本配置(地址、用户名、密码、数据库), 第一次启动项目时，会自动初始化需要的数据

- 启动项目，项目聚成两个子项目，分别为admin站，web站，
  如果

npm run start:dev
5、运行第五步的时候会默认初始化菜单数据和用户数据(账号:admin,密码:123456)

6、如果你想初始化别的数据,可以在src/services/init-db中写上你要初始化的数据
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
