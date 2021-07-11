import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Admin } from './models/admin.model';
import { User } from './models/user.model';
import { Role } from './models/role.model';
import { Menu } from './models/menu.model';

const models = TypegooseModule.forFeature([Admin, User, Role, Menu]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot(process.env.M_DB_HOST_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
