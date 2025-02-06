import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateFamilyMemberDto,
  CreateFamilyTreeDto,
  FamilyMemberEntity,
  FamilyTreeEntity,
  UpdateFamilyMemberDto,
} from '.';
import { Repository } from 'typeorm';
import { GetEntity } from 'src/types';

@Injectable()
export class FamilyTreesService {
  constructor(
    @InjectRepository(FamilyMemberEntity)
    private readonly familyMembersRepository: Repository<FamilyMemberEntity>,
    @InjectRepository(FamilyTreeEntity)
    private readonly treesRepository: Repository<FamilyTreeEntity>,
  ) {}

  private async getFamilyMember({
    select,
    where,
    relations,
  }: GetEntity<FamilyMemberEntity>) {
    const member = await this.familyMembersRepository.findOne({
      select,
      where,
      relations,
    });

    if (!member) {
      throw new NotFoundException(`Family member was not found`);
    }

    return member;
  }

  private async getTree({
    select,
    where,
    relations,
  }: GetEntity<FamilyTreeEntity>) {
    const tree = await this.treesRepository.findOne({
      select,
      where,
      relations,
    });

    if (!tree) {
      throw new NotFoundException(`Tree was not found`);
    }

    return tree;
  }

  getTrees() {
    return this.treesRepository.find();
  }

  createTree({ name }: CreateFamilyTreeDto) {
    const newTree = this.treesRepository.create({ name });

    return this.treesRepository.save(newTree);
  }

  getTreeById(treeId: number) {
    return this.getTree({
      where: { id: treeId },
      relations: { members: { parent1: true, parent2: true } },
    });
  }

  async createTreeMember(
    treeId: number,
    createFamilyMemberDto: CreateFamilyMemberDto,
  ) {
    const tree = await this.getTree({ where: { id: treeId } });
    const { name, age, firstParentId, secondParentId } = createFamilyMemberDto;

    const [firstParent, secondParent] = await Promise.all([
      firstParentId
        ? this.getFamilyMember({ where: { id: firstParentId } })
        : null,
      secondParentId
        ? this.getFamilyMember({ where: { id: secondParentId } })
        : null,
    ]);

    const newFamilyMember = this.familyMembersRepository.create({
      name,
      age,
      tree,
      ...(firstParent ? { parent1: firstParent } : {}),
      ...(secondParent ? { parent2: secondParent } : {}),
    });

    return this.familyMembersRepository.save(newFamilyMember);
  }

  async updateTreeMember(
    treeId: number,
    familyMemberId: number,
    { age, name }: UpdateFamilyMemberDto,
  ) {
    const familyMemberToUpdate = await this.getFamilyMember({
      where: { id: familyMemberId },
      relations: { tree: true, parent1: true, parent2: true },
    });

    if (familyMemberToUpdate.tree.id !== treeId) {
      throw new BadRequestException(
        'Family member does not belong to the specified tree',
      );
    }

    familyMemberToUpdate.name = name;
    familyMemberToUpdate.age = age;

    return this.familyMembersRepository.save(familyMemberToUpdate);
  }

  async deleteTreeMember(treeId: number, familyMemberId: number) {
    const familyMemberToDelete = await this.getFamilyMember({
      where: { id: familyMemberId },
      relations: { tree: true, parent1: true, parent2: true },
    });

    if (familyMemberToDelete.tree.id !== treeId) {
      throw new BadRequestException(
        'Family member does not belong to the specified tree',
      );
    }

    const children = await this.familyMembersRepository.find({
      where: [
        { parent1: { id: familyMemberId } },
        { parent2: { id: familyMemberId } },
      ],
      relations: {
        parent1: true,
        parent2: true,
      },
    });

    const deletionPromises = children.map(async (child) => {
      try {
        if (
          (child.parent1 && child.parent1.id !== familyMemberId) ||
          (child.parent2 && child.parent2.id !== familyMemberId)
        ) {
          if (child.parent1?.id === familyMemberId) {
            child.parent1 = null;
          } else if (child.parent2?.id === familyMemberId) {
            child.parent2 = null;
          }

          await this.familyMembersRepository.save(child);

          return null;
        }

        await this.familyMembersRepository.delete(child.id);

        return child;
      } catch (error) {
        console.error(error);
        return null;
      }
    });

    const deletedMembers = (await Promise.all(deletionPromises)).filter(
      (member) => member !== null,
    );

    await this.familyMembersRepository.delete(familyMemberToDelete.id);

    deletedMembers.push(familyMemberToDelete);

    return deletedMembers;
  }
}
