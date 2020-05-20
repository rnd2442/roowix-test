import React from "react";
import { Input } from "rsuite";

type TProps = {
  name: string;
  value: string;
  isError: boolean;
  callback: (value: string, event: React.SyntheticEvent<HTMLElement>) => void;
};

export const CoordInput: React.FC<TProps> = ({ name, value, callback }) => (
  <Input
    style={{
      width: `${value.length * 7 + 5}px`,
    }}
    name={name}
    value={value}
    onChange={callback}
  />
);
