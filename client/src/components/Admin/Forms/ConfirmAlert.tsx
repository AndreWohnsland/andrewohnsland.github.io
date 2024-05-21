import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const submitAlert = (
  prompt: string,
  executionFunction: () => void,
  yesButtonText = 'Yes',
  noButtonText = 'No',
  headerText = 'Are you sure?',
) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="confirm-alert-container">
          <h1>{headerText}</h1>
          <p>{prompt}</p>
          <button
            className="btn-yes"
            onClick={() => {
              executionFunction()
              onClose()
            }}
          >
            {yesButtonText}
          </button>
          <button className="btn-no" onClick={onClose}>
            {noButtonText}
          </button>
        </div>
      )
    },
  })
}

export default submitAlert
