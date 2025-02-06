import { FC, useState } from "react";
import { FamilyMemberType } from "../../types";
import { TextBox } from "./TreeDetailsMember.styled";

type TreeDetailsMemberProps = {
  member: FamilyMemberType;
  getChildren: (memberId: number) => FamilyMemberType[];
};

export const TreeDetailsMember: FC<TreeDetailsMemberProps> = ({
  member,
  getChildren,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const children = getChildren(member.id);
  const canExpand = children.length > 0;

  const toggleExpansion = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div>
      <TextBox>
        {canExpand && (
          <button onClick={toggleExpansion}>
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        )}
        <p>
          {member.name} (Age: {member.age})
        </p>
      </TextBox>
      {isExpanded && (
        <ul style={{ marginLeft: "30px" }}>
          {children.map((child) => (
            <li key={child.id}>
              <TreeDetailsMember member={child} getChildren={getChildren} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
