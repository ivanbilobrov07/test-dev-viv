import { useEffect, useState } from "react";
import { addTree, fetchTrees } from "../../api";
import { ComponentStatus } from "../../enums";
import { FamilyTreeType } from "../../types";
import {
  Form,
  InputWrapper,
  List,
  ListItem,
  StyledLink,
} from "./TreeList.styled";
import { Button } from "../Button";

export const TreeList = () => {
  const [trees, setTrees] = useState<FamilyTreeType[]>([]);
  const [status, setStatus] = useState(ComponentStatus.LOADING);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newTreeName, setNewTreeName] = useState("");

  useEffect(() => {
    const getTrees = async () => {
      try {
        setTrees(await fetchTrees());
        setStatus(ComponentStatus.SUCCESS);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occurred.");
        }

        setStatus(ComponentStatus.ERROR);
      }
    };

    getTrees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setStatus(ComponentStatus.LOADING);

      const newTree = await addTree(newTreeName);

      setStatus(ComponentStatus.SUCCESS);
      setTrees((trees) => [...trees, newTree]);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }

      setStatus(ComponentStatus.ERROR);
    }

    setNewTreeName("");
  };

  if (status === ComponentStatus.LOADING) {
    return <p>Loading trees...</p>;
  }

  if (status === ComponentStatus.ERROR) {
    return <p>Error: {errorMessage}</p>;
  }

  if (!trees.length) {
    return;
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <p>Tree name</p>
          <input
            type="text"
            value={newTreeName}
            onChange={(e) => setNewTreeName(e.target.value)}
          />
        </InputWrapper>
        <Button disabled={newTreeName === ""} type="submit">
          Add tree
        </Button>
      </Form>
      {trees.length ? (
        <List>
          {trees.map(({ id, name }) => (
            <ListItem key={id}>
              <StyledLink to={`/trees/${id}`}>{name}</StyledLink>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>There isn't any trees</p>
      )}
    </>
  );
};
