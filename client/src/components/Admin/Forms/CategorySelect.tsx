import React, { useState } from 'react'
import { Button, ButtonToolbar, Form, InputGroup } from 'react-bootstrap'

const minCatLen = 3

type CategorySelectProps = {
  name: string
  categories: string[]
  existingCategories: string[]
  setCategories: (l: string[]) => void
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  name,
  categories,
  existingCategories,
  setCategories,
}) => {
  const [input, setInput] = useState('')

  const validateAdd = () => {
    return input.length >= minCatLen
  }

  const addCategory = (catToAdd: string): void => {
    if (!categories.includes(catToAdd)) {
      setCategories([...categories, catToAdd])
    }
    setInput('')
  }

  const onKeyUp = (event: React.KeyboardEvent) => {
    if (event.charCode === 13) {
      addCategory(input)
    }
  }

  const delteCategory = (catToRemove: string): void => {
    const newCategories = categories.filter((item) => {
      return item !== catToRemove
    })
    setCategories(newCategories)
  }

  return (
    <div className="category-box">
      <div className="selected-categories">
        <p style={{ marginBottom: '6px', marginTop: '2px' }}>
          Categories:&nbsp;&nbsp;
        </p>
        {categories.sort().map((c) => (
          <span className="selected-categories" key={`close-${c}`}>
            <button
              type="button"
              className="category-close-button"
              onClick={() => delteCategory(c)}
            >
              x
            </button>
            <span className="selected-categories-text">{c}</span>
          </span>
        ))}
      </div>
      <ButtonToolbar className="mb-3">
        <InputGroup className="category-input-group">
          <Form.Control
            name={name}
            className="input-category"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={onKeyUp}
          />
        </InputGroup>
        <Button
          className="add-category"
          onClick={() => addCategory(input)}
          disabled={!validateAdd()}
        >
          Add
        </Button>
      </ButtonToolbar>
      <div className="available-categories">
        <p style={{ marginBottom: '6px' }}>Existing:&nbsp;&nbsp;</p>
        {existingCategories.map((c) => (
          <Button
            onClick={() => addCategory(c)}
            className="available-categories"
            variant="primary"
            size="sm"
            key={c}
          >
            {c}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default CategorySelect
