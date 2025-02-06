import { FamilyMemberType } from ".";

export type FamilyTreeType = {
    id: number;
    name: string;
}

export type FamilyTreeDetailsType = {
    id: number;
    name: string;
    members: FamilyMemberType[]
}