import { FC, useState } from "react";
import { Modal } from "../Modal";
import {
  deleteFamilyMemberPending,
  useAppDispatch,
  useAppSelector,
} from "../../redux";
import { Button } from "../Button";
import {
  InputWrapper,
  Label,
  Title,
  Wrapper,
} from "./DeleteFamilyMemberModal.styled";

type DeleteFamilyMemberFormProps = {
  treeId: number;
  onClose: () => void;
};

export const DeleteFamilyMemberModal: FC<DeleteFamilyMemberFormProps> = ({
  treeId,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.tree.members);

  const [selectedMemberId, setSelectedMemberId] = useState<number | undefined>(
    undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedMemberId) {
      dispatch(
        deleteFamilyMemberPending({
          treeId,
          familyMemberId: selectedMemberId,
        })
      );

      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <Wrapper>
        <Title>Delete Family Member</Title>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Label>Select Family Member</Label>
            <select
              value={selectedMemberId ?? ""}
              onChange={(e) =>
                setSelectedMemberId(
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            >
              <option value="">Select a member</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </InputWrapper>
          {selectedMemberId && (
            <p>
              It will delete all the children, if they don't have other parent
            </p>
          )}
          <Button type="submit">Delete Member</Button>
        </form>
      </Wrapper>
    </Modal>
  );
};
