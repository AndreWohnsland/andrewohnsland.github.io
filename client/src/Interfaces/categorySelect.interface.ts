import { ValueType, ActionMeta } from 'react-select';

export interface SelectProps {
  value: string;
  label: string;
}

type IsMulti = true;
export type OnSelectChangeValue = ValueType<SelectProps, IsMulti>;
export type OnSelectChangeActionMeta = ActionMeta<SelectProps>;
