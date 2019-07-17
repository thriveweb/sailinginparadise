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

      !current.contains(target)
        && this.setState({
          activeDropdown: false
        })
    })
  }

  render() {
    const { name, options, placeholder } = this.props
    const { active, activeDropdown = false } = this.state

    const activeOption = active && active.toLowerCase()

    return <label className={`Form--Label`} ref={this.mySelect}>
      <select
        style={{display: 'none'}}
        name={name}
        onChange={this.props.handleValueChange}
      >
        {options.map((option, index) =>
          <option
            key={option}
            value={option}
            selected={option.toLowerCase() === activeOption ? true : null}
          >
            {option}
          </option>
        )}
      </select>
      <div className={`select-dropdown ${activeDropdown ? 'active' : ''}`}>
        <p className='Form--Input has-arrow' onClick={() => this.setState({ activeDropdown: !activeDropdown })}>
          {activeOption ? activeOption : placeholder} <ICONArrowDown />
        </p>
        <ul>
          {options.map(option =>
            <li
              key={option}
              onClick={() => this.setState({ active: option.toLowerCase(), activeDropdown: false })}
              className={option === activeOption ? 'active' : ''}
            >
              {option}
            </li>
          )}
        </ul>
      </div>
    </label>
  }
}

export default Select
