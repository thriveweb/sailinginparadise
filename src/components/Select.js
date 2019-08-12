import React, { Component } from 'react'
import { ICONArrowDown } from './Icons'
import './Select.css'

class Select extends Component {
  constructor(props) {
    super(props)
    this.mySelect = React.createRef()

    this.state = {}
  }

  componentDidMount = () => {
    const { selected } = this.props
    const current = this.mySelect.current

    this.setState({
      active: selected && selected.replace(/-/g, ' ')
    })

    window.addEventListener('click', e => {
      const target = e.target

      !current.contains(target) &&
        this.setState({
          activeDropdown: false
        })
    })
  }

  componentDidUpdate = (props, state) => {
    if (state.active !== this.state.active && this.props.handleValueChange) {
      this.props.handleValueChange({
        target: {
          value: this.state.active,
          name: this.props.name
        }
      })
    }
  }

  render() {
    const { className, name, options, placeholder } = this.props
    const { active, activeDropdown = false } = this.state

    const activeOption = active && active.toLowerCase()

    return (
      <label className={`Form--Label ${className}`} ref={this.mySelect}>
        <select name={name} onChange={this.props.handleValueChange} required>
          <option value="">Please select an option</option>
          {options.map((option, index) => (
            <option
              key={option}
              value={option}
              selected={option.toLowerCase() === activeOption ? true : null}
            >
              {option}
            </option>
          ))}
        </select>
        <div className={`select-dropdown ${activeDropdown ? 'active' : ''}`}>
          <span
            className="Form--Input has-arrow"
            onClick={() => this.setState({ activeDropdown: !activeDropdown })}
          >
            {activeOption ? activeOption : placeholder} <ICONArrowDown />
          </span>
          <ul>
            {options.map(option => (
              <li
                key={option}
                onClick={() =>
                  this.setState({
                    active: option.toLowerCase(),
                    activeDropdown: false
                  })
                }
                className={option === activeOption ? 'active' : ''}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </label>
    )
  }
}

export default Select
