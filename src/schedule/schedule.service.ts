import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ScheduleService {
  @Cron(CronExpression.EVERY_10_MINUTES)
  handleCron() {
    console.log(
      `Cron Task Triggered!! Current time: ${new Date().toLocaleString()}.}`,
    );
  }
}
