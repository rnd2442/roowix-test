import React from "react";
import { InputGroup, Input } from "rsuite";

type TProps = {
  label: string;
  name: string;
  value: string;
  callback: (value: string, event: React.SyntheticEvent<HTMLElement>) => void;
};

export const ValueInput: React.FC<TProps> = ({
  children,
  label,
  name,
  value,
  callback,
}) => {
  return (
    <div>
      <label className="cam-params-label">{label}</label>
      <InputGroup className="cam-params-group">
        <Input name={name} value={value} onChange={callback} />
        {children}
      </InputGroup>
    </div>
  );
};
