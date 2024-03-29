import { ReactNode } from "react";
import React from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

type SelectionProps<T> = {
    className?: string
    value: T
    onChange: React.Dispatch<React.SetStateAction<T>>
    label: string
    placeholder: string
    options: T[]
    disabled?: boolean
}

const Selection = <T,>({className, value, onChange, label, placeholder, options, disabled }:SelectionProps<T>): ReactNode => {
  
  return (
    <div className={`${className} w-fit my-6`}>
    <FormControl className={`${className}`} variant="standard" sx={{ width: 160 }}>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select
        variant="standard"
        labelId={label}
        id={label}
        value={value as string}
        onChange={(event: SelectChangeEvent) => onChange(event.target.value as T)}
        label={label}
        placeholder={placeholder}
        disabled={disabled}>
        {(options as string[]).map((option,idx) => <MenuItem key={idx} value={option}>{option}</MenuItem>)}
      </Select>
    </FormControl>
    </div>
  );


};

export default Selection;