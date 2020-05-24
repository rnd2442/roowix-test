import React from "react";
import { InputGroup, Input } from "rsuite";

type TProps = {
  label: string;
  name: string;
  value: string;
  callback: (value: string, event: React.SyntheticEvent<HTMLElement>) => void;
  clearButton?: JSX.Element;
};

export const ValueInput: React.FC<TProps> = ({
  label,
  name,
  value,
  callback,
  clearButton = null,
}) => (
  <div>
    <label className="cam-params-label">{label}</label>
    <InputGroup className="cam-params-group">
      <Input name={name} value={value} onChange={callback} />
      {clearButton}
    </InputGroup>
  </div>
);
