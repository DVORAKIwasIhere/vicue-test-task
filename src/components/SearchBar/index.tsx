import { ChangeEventHandler } from "react"

interface SearchBarProps {
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
  }

export const SearchBar = ({value, onChange}: SearchBarProps) => {
    return(
        <input 
        type="text"
        value={value}
        onChange={onChange}
        />
    )
}