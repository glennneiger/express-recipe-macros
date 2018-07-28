import React from 'react'
import Popover from '../containers/Popover'

const ErrorMessage = ({ message, closePopover }) => (
  <Popover closePopover={closePopover}>
    <div>{message}</div>
  </Popover>
)

export default ErrorMessage
