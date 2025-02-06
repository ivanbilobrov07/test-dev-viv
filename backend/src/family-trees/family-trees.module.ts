import { Module } from '@nestjs/common';
import { FamilyTreesService } from './family-trees.service';
import { FamilyTreesController } from './family-trees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyMemberEntity, FamilyTreeEntity } from '.';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyMemberEntity, FamilyTreeEntity])],
  providers: [FamilyTreesService],
  controllers: [FamilyTreesController],
})
export class FamilyTreesModule {}
