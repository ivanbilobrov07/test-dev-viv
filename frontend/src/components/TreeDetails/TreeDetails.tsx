import { FC, useEffect, useState } from "react";
import { FamilyMemberType } from "../../types";
import {
  TreeDetailsMember,
  AddFamilyMemberModal,
  EditFamilyMemberModal,
  DeleteFamilyMemberModal,
  Button,
} from "../../components";
import { ButtonsWrapper, Title } from "./TreeDetails.styled";
import { fetchTreePending, useAppDispatch, useAppSelector } from "../../redux";

type TreeDetailsProps = {
  treeId: number;
};

export const TreeDetails: FC<TreeDetailsProps> = ({ treeId }) => {
  const dispatch = useAppDispatch();
  const { members, name, loading, error } = useAppSelector(
    (state) => state.tree
  );
  const [isCreateModalShown, setIsCreateModalShown] = useState(false);
  const [isEditModalShown, setIsEditModalShown] = useState(false);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

  useEffect(() => {
    dispatch(fetchTreePending({ id: treeId }));
  }, [dispatch, treeId]);

  const topLevelMembers =
    members.filter((member) => !member.parent1 && !member.parent2) ?? [];

  const closeModal = () => {
    setIsDeleteModalShown(false);
    setIsCreateModalShown(false);
    setIsEditModalShown(false);
  };

  const getChildren = (memberId: number): FamilyMemberType[] => {
    return (
      members.filter(
        ({ parent1, parent2 }) =>
          parent1?.id === memberId || parent2?.id === memberId
      ) ?? []
    );
  };

  if (loading) {
    return <p>Loading trees...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div>
        <Title>{name}</Title>
        <ButtonsWrapper>
          <Button onClick={() => setIsCreateModalShown(true)}>
            Add family member
          </Button>
          <Button onClick={() => setIsEditModalShown(true)}>
            Edit family member
          </Button>
          <Button onClick={() => setIsDeleteModalShown(true)}>
            Delete family member
          </Button>
        </ButtonsWrapper>
        <ul>
          {topLevelMembers.map((member) => (
            <li key={member.id}>
              <TreeDetailsMember member={member} getChildren={getChildren} />
            </li>
          ))}
        </ul>
      </div>
      {isCreateModalShown && (
        <AddFamilyMemberModal treeId={treeId} onClose={closeModal} />
      )}
      {isEditModalShown && (
        <EditFamilyMemberModal treeId={treeId} onClose={closeModal} />
      )}
      {isDeleteModalShown && (
        <DeleteFamilyMemberModal treeId={treeId} onClose={closeModal} />
      )}
    </>
  );
};
