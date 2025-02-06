import { FC, useState } from "react";
import { Modal } from "../Modal";
import {
  InputWrapper,
  Label,
  Title,
  Wrapper,
} from "./AddFamilyMemberModal.styled";
import {
  addFamilyMemberPending,
  useAppDispatch,
  useAppSelector,
} from "../../redux";
import { Button } from "../Button";

type AddFamilyMemberModalProps = {
  treeId: number;
  onClose: () => void;
};

export const AddFamilyMemberModal: FC<AddFamilyMemberModalProps> = ({
  treeId,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.tree.members);

  const [name, setName] = useState("");
  const [age, setAge] = useState(1);
  const [firstParentId, setFirstParentId] = useState<number | null>(null);
  const [secondParentId, setSecondParentId] = useState<number | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAge(Number(e.target.value));
  const handleFirstParentIdChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setFirstParentId(value === "" ? null : Number(value));
  };
  const handleSecondParentIdChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setSecondParentId(value === "" ? null : Number(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      addFamilyMemberPending({
        treeId,
        name,
        age,
        firstParentId,
        secondParentId,
      })
    );

    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Wrapper>
        <Title>Add New Family Member</Title>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Label>Name</Label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Age</Label>
            <input
              type="number"
              value={age}
              min={1}
              onChange={handleAgeChange}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label>First Parent</Label>
            <select
              value={firstParentId ?? ""}
              onChange={handleFirstParentIdChange}
            >
              <option value={""}>None</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </InputWrapper>
          <InputWrapper>
            <Label>Second Parent</Label>
            <select
              value={secondParentId ?? ""}
              onChange={handleSecondParentIdChange}
            >
              <option value={""}>None</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </InputWrapper>
          <Button type="submit">Add Family Member</Button>
        </form>
      </Wrapper>
    </Modal>
  );
};
