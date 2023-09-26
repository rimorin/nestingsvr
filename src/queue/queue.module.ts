import { Module } from '@nestjs/common';
import { QueueWorker } from './queue.worker';

@Module({
  providers: [QueueWorker],
})
export class QueueModule {}
