import { Module } from '@nestjs/common';
import { FamilyTreesModule } from './family-trees/family-trees.module';
import { ConfigModule } from '@nestjs/config';
import { getTypeOrmConfig } from './configs';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.dev' }),
    TypeOrmModule.forRootAsync(getTypeOrmConfig()),
    FamilyTreesModule,
  ],
})
export class AppModule {}
