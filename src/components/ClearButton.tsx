import React from "react";
import { InputGroup, Icon } from "rsuite";

type TProps = {
  name: string;
  callback: (event: React.SyntheticEvent) => void;
};

export const ClearButton: React.FC<TProps> = ({ name, callback }) => (
  <InputGroup.Addon style={{ background: "white" }}>
    <Icon
      className="clear-btn"
      icon="close-circle"
      id={`clearBtn_${name}`}
      onClick={callback}
    />
  </InputGroup.Addon>
);
