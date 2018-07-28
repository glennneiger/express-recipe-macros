import React, { Component } from 'react'

export default class Popover extends Component {
  render() {
    return (
      <div className="overlay">
        <div className="popover">
          <div
            className="popover-close-button"
            onClick={this.props.closePopover}
          >
            CLOSE
          </div>
          {React.cloneElement(this.props.children, {
            closePopover: this.props.closePopover,
          })}
        </div>
      </div>
    )
  }
}
