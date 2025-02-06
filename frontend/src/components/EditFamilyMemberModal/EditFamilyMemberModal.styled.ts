import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 300px;
  max-width: 550px;
  width: 100%;
  padding: 12px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const InputWrapper = styled.label`
  display: block;
  margin-bottom: 8px;

  &:last-of-type {
    margin-bottom: 20px;
  }
`;

export const Label = styled.span`
  display: block;
  margin-bottom: 3px;
`;
