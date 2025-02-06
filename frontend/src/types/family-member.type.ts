export type FamilyMemberType = {
    id: number;
    name: string;
    age: number;
    parent1: FamilyMemberType | null,
    parent2: FamilyMemberType | null,
}