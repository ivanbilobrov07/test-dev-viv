import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Check,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FamilyTreeEntity } from '.';

@Entity({ name: 'family_member' })
export class FamilyMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'smallint' })
  @Check('age > 0')
  age: number;

  @ManyToOne(() => FamilyMemberEntity, (familyMember) => familyMember.parent1, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent1_id' })
  parent1: FamilyMemberEntity | null;

  @ManyToOne(() => FamilyMemberEntity, (familyMember) => familyMember.parent2, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent2_id' })
  parent2: FamilyMemberEntity | null;

  @ManyToOne(() => FamilyTreeEntity, (tree) => tree.members)
  @JoinColumn({ name: 'family_tree_id' })
  tree: FamilyTreeEntity;
}
