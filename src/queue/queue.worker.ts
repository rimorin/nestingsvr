import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE_NAME, QUEUE_TASK_NAME } from './../app.constants';

@Processor(QUEUE_NAME)
export class QueueWorker {
  @Process(QUEUE_TASK_NAME)
  handleLogMessage(job: Job) {
    console.log(
      `Processing message job ${job.id} of type ${
        job.name
      } with data ${JSON.stringify(job.data)}...`,
    );
  }
}
