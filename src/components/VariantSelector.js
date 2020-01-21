import React from "react"

const VariantSelector = ({ handleOptionChange, option }) => {
  return (
    <select
      name={option.name}
      key={option.name}
      onBlur={handleOptionChange}
      onChange={handleOptionChange}
      defaultValue={"DEFAULT"}
    >
      <option value="DEFAULT" disabled>
        Select one
      </option>
      {option.values.map(value => {
        return (
          <option
            value={value}
            key={`${option.name}-${value}`}
          >{`${value}`}</option>
        )
      })}
    </select>
  )
}

export default VariantSelector
