import { TreeList } from "../../components";
import { Section, Title } from "./TreeListPage.styled";

const TreeListPage = () => {
  return (
    <Section>
      <Title>All family trees</Title>
      <TreeList />
    </Section>
  );
};

export default TreeListPage;
