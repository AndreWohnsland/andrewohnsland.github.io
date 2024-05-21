import { OnChangeValue, ActionMeta } from 'react-select'

export interface SelectProps {
  value: string
  label: string
}

type IsMulti = true
export type OnSelectChangeValue = OnChangeValue<SelectProps, IsMulti>
export type OnSelectChangeActionMeta = ActionMeta<SelectProps>
