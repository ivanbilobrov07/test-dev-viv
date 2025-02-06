import { Link } from "react-router-dom";
import styled from "styled-components";

export const List = styled.ul`
  display: flex;
  gap: 25px;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  border: 1px solid black;
`;

export const StyledLink = styled(Link)`
  display: block;
  padding: 10px 25px;
`;

export const Form = styled.form`
  margin-bottom: 20px;
`;

export const InputWrapper = styled.label`
  display: block;
  margin-bottom: 20px;
`;
