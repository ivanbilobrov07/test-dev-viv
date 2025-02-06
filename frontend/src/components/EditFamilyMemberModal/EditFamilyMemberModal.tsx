import { FC, useEffect, useState } from "react";
import { Modal } from "../Modal";
import {
  editFamilyMemberPending,
  useAppDispatch,
  useAppSelector,
} from "../../redux";
import { Button } from "../Button";
import {
  InputWrapper,
  Label,
  Title,
  Wrapper,
} from "./EditFamilyMemberModal.styled";

type EditFamilyMemberFormProps = {
  treeId: number;
  onClose: () => void;
};

export const EditFamilyMemberModal: FC<EditFamilyMemberFormProps> = ({
  treeId,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.tree.members);

  const [selectedMemberId, setSelectedMemberId] = useState<number | undefined>(
    undefined
  );
  const [name, setName] = useState("");
  const [age, setAge] = useState(1);

  useEffect(() => {
    if (!selectedMemberId) {
      return;
    }

    const selectedMember = members.find(
      (member) => member.id === selectedMemberId
    );

    if (selectedMember) {
      setName(selectedMember.name);
      setAge(selectedMember.age);
    }
  }, [selectedMemberId, members]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedMemberId) {
      dispatch(
        editFamilyMemberPending({
          treeId,
          familyMemberId: selectedMemberId,
          name,
          age,
        })
      );

      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <Wrapper>
        <Title>Edit Family Member</Title>
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
            <>
              <InputWrapper>
                <Label>Name</Label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputWrapper>
              <InputWrapper>
                <Label>Age</Label>
                <input
                  type="number"
                  value={age}
                  min={1}
                  onChange={(e) => setAge(Number(e.target.value))}
                />
              </InputWrapper>
            </>
          )}
          <Button type="submit">Update Member</Button>
        </form>
      </Wrapper>
    </Modal>
  );
};
