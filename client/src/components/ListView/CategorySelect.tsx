import React from 'react'
import Select from 'react-select'
import {
  SelectProps,
  OnSelectChangeValue,
  OnSelectChangeActionMeta,
} from '../../Interfaces/categorySelect.interface'

type CategorySelectProps = {
  categoryInfo: SelectProps[]
  categoryValue: SelectProps[]
  onChange: (e: OnSelectChangeValue, a?: OnSelectChangeActionMeta) => void
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  categoryInfo,
  categoryValue,
  onChange,
}) => {
  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      name="categories"
      options={categoryInfo}
      className="basic-multi-select category-multi-select"
      classNamePrefix="select"
      placeholder="Select Category to Filter"
      value={categoryValue}
      onChange={onChange}
    />
  )
}

export default CategorySelect
