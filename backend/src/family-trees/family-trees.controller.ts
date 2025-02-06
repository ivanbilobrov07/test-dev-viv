import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateFamilyMemberDto,
  CreateFamilyTreeDto,
  UpdateFamilyMemberDto,
} from '.';
import { FamilyTreesService } from './family-trees.service';

@Controller('family_trees')
export class FamilyTreesController {
  constructor(private readonly treesService: FamilyTreesService) {}

  @Post()
  createTree(@Body() createTreeDto: CreateFamilyTreeDto) {
    return this.treesService.createTree(createTreeDto);
  }

  @Get()
  getTrees() {
    return this.treesService.getTrees();
  }

  @Get('/:tree_id')
  getTreeById(@Param('tree_id', ParseIntPipe) treeId: number) {
    return this.treesService.getTreeById(treeId);
  }

  @Post('/:tree_id/family_members')
  createFamilyMember(
    @Param('tree_id', ParseIntPipe) treeId: number,
    @Body() createFamilyMemberDto: CreateFamilyMemberDto,
  ) {
    return this.treesService.createTreeMember(treeId, createFamilyMemberDto);
  }

  @Put('/:tree_id/family_members/:family_member_id')
  updateFamilyMember(
    @Param('tree_id', ParseIntPipe) treeId: number,
    @Param('family_member_id', ParseIntPipe) familyMemberId: number,
    @Body() updateFamilyMemberDto: UpdateFamilyMemberDto,
  ) {
    return this.treesService.updateTreeMember(
      treeId,
      familyMemberId,
      updateFamilyMemberDto,
    );
  }

  @Delete('/:tree_id/family_members/:family_member_id')
  deleteFamilyMember(
    @Param('tree_id', ParseIntPipe) treeId: number,
    @Param('family_member_id', ParseIntPipe) familyMemberId: number,
  ) {
    return this.treesService.deleteTreeMember(treeId, familyMemberId);
  }
}
