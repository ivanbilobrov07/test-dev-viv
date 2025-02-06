import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FamilyMemberEntity } from '.';

@Entity({ name: 'family_tree' })
export class FamilyTreeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  name: string;

  @OneToMany(() => FamilyMemberEntity, (familyMember) => familyMember.tree)
  members: FamilyMemberEntity[];
}
