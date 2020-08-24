import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Admin } from './models/admin.model';

const models = TypegooseModule.forFeature([Admin]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://121.42.14.221:27017/nest-test', {
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
