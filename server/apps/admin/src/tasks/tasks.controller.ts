/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-09 14:15:54
 * @LastEditTime: 2021-08-09 14:26:32
 * @Description: Modify here please
 */
import { Controller, Delete, Post } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('定时任务')
@Controller('tasks')
export class TasksController {
    constructor(private schedulerRegistry: SchedulerRegistry){}


    @Post('addInterval')
    @ApiOperation({ summary: '添加隔间任务' })
    addInterval(){
        const callback = () => {
            console.log('每个2秒打印一次');
        };
        const interval = setInterval(callback, 2000);
        this.schedulerRegistry.addInterval('testInterval',interval )

        return '已成功添加名称为：testInterval的隔间任务'
    }
    

    @Delete('removeInterval')
    @ApiOperation({ summary: '删除隔间任务' })
    delInterval(){
        this.schedulerRegistry.deleteInterval('testInterval')
        return '已经删除名称为：testInterval的隔间任务'
    }
}
