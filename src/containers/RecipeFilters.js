import React, { Component } from 'react'

export default class Filters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filters: props.params ? getFiltersFromProps(props) : defaultFilters,
    }
  }

  componentDidMount() {
    this.props.onApplyFilters(this.state.filters)
  }

  render() {
    return (
      <div className="filters">
        <h2 style={{ padding: '1rem', marginBottom: '1rem', fontSize: '2rem' }}>
          Filter Recipes
        </h2>
        {this.renderFilters(this.state.filters)}
        <button
          className="filter-button"
          onClick={() => this.props.onApplyFilters(this.state.filters)}
        >
          Apply Filters
        </button>
      </div>
    )
  }

  handleChange = (e, option) => {
    const filterValue = Number(e.target.value)
    const end = e.target.attributes.end.value

    const filterValueIsValid = !isNaN(filterValue)

    const defaultValue = end === 'min' ? 0 : 100
    const value = filterValueIsValid ? filterValue : defaultValue

    const filters = {
      filters: {
        ...this.state.filters,
        [option]: {
          ...this.state.filters[option],
          [end]: value,
        },
      },
    }

    this.setState(filters)
  }

  renderFilters = filters =>
    Object.keys(filters).map(option => (
      <Filter
        key={`filter-${option}`}
        option={option}
        title={`% ${option}`}
        minValue={filters[option].min}
        maxValue={filters[option].max}
        onChange={this.handleChange}
      />
    ))
}

const Filter = ({ option, title, minValue, maxValue, onChange }) => (
  <div className="filter">
    <h3 className="filter-option-title">{option.toUpperCase()}</h3>
    <div className="filter-end">
      <label htmlFor={`${option}-min`}>min</label>
      <input
        end="min"
        name={`${option}-max`}
        id={`${option}-max`}
        value={minValue}
        onChange={e => onChange(e, option)}
        className="filter-option"
      />
    </div>
    <div className="filter-end">
      <label htmlFor={`${option}-min`}>max</label>
      <input
        end="max"
        name={`${option}-min`}
        id={`${option}-min`}
        value={maxValue}
        onChange={e => onChange(e, option)}
        className="filter-option"
      />
    </div>
  </div>
)

const getFiltersFromProps = ({ params }) => {
  const paramArray = Object.keys(params)
  const macros = Object.keys(params).map(key => params[key].split('-'))

  const filtersFromParams = macros.reduce((filters, number, i) => {
    let min = Number(number[0])
    min = isNaN(min) || min < 0 || min > 100 ? 0 : min

    let max = Number(number[1])
    max = isNaN(max) || max > 100 || max < 0 ? 100 : max

    const macro = paramArray[i]

    filters[macro] = {
      min,
      max,
    }
    return filters
  }, defaultFilters)

  return filtersFromParams
}

const defaultFilters = {
  protein: {
    min: 0,
    max: 100,
  },
  fat: {
    min: 0,
    max: 100,
  },
  carbohydrates: {
    min: 0,
    max: 100,
  },
}
