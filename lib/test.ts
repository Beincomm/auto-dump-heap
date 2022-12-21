import {Module} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {ObjectCannedACL} from "@aws-sdk/client-s3";
import {AutoDumpHeapModule} from './auto-dump-heap.module';
import { MODE} from "./interfaces/auto-dump-heap.module.interfaces";

@Module({
  imports: [
    AutoDumpHeapModule.forRootAsync({
      mode: MODE.MANUAL,
      useFactory:  () => {
        return {
          s3: {
            bucket: 'local-upload-for-developer',
            options: {
              credentials: {
                accessKeyId: 'AKIAUKGD6KMY4GHVZDIV',
                secretAccessKey: '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',
              },
              region: 'ap-southeast-1',
            },
            putCommandOptions:{
              env: 'develop',
              alc: ObjectCannedACL.public_read
            }
          },
          controllerPath: 'dump-heap'
        }
      },
      imports: [],
    }),
  ],
})
export class TestModule {}

(async () => {
  await (await NestFactory.create(TestModule)).listen(4000);
})();
