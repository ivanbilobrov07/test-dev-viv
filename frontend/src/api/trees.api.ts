import { apiClient } from "./axiosInstance.api";

export type FetchTreeByIdParams = {
  id: number;
};

export type AddFamilyMemberParams = {
  treeId: number;
  name: string;
  age: number;
  firstParentId: number | null;
  secondParentId: number | null;
};

export type EditFamilyMemberParams = {
  treeId: number;
  familyMemberId: number;
  name: string;
  age: number;
};

export type DeleteFamilyMemberParams = {
  treeId: number;
  familyMemberId: number;
};

export const fetchTrees = async () => {
  try {
    const { data } = await apiClient.get("/family_trees");

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addTree = async (name: string) => {
  try {
    const { data } = await apiClient.post("/family_trees", { name });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchTreeById = async ({ id }: FetchTreeByIdParams) => {
  const { data } = await apiClient.get(`/family_trees/${id}`);

  return data;
};

export const addFamilyMember = async (data: AddFamilyMemberParams) => {
  const { treeId, name, age, firstParentId, secondParentId } = data;

  const { data: response } = await apiClient.post(
    `/family_trees/${treeId}/family_members`,
    {
      name,
      age,
      firstParentId,
      secondParentId,
    }
  );

  return response;
};

export const editFamilyMember = async (data: EditFamilyMemberParams) => {
  const { treeId, familyMemberId, name, age } = data;

  const { data: response } = await apiClient.put(
    `/family_trees/${treeId}/family_members/${familyMemberId}`,
    {
      name,
      age,
    }
  );

  return response;
};

export const deleteFamilyMember = async (data: DeleteFamilyMemberParams) => {
  const { treeId, familyMemberId } = data;

  const { data: response } = await apiClient.delete(
    `/family_trees/${treeId}/family_members/${familyMemberId}`
  );

  return response;
};
