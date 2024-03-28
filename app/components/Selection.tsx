import { ReactNode } from "react";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type SelectionProps = {
    className?: string
    value: any;
    onChange: React.Dispatch<React.SetStateAction<any>>;
    label: string;
    options: string[];
}

const Selection = ({className, value, onChange, label, options}:SelectionProps): ReactNode => {
  return (
    <FormControl className={`${className}`} variant="outlined" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={(event: SelectChangeEvent) => onChange(event.target.value)}
        label={label}>
        {options.map((option,idx) => <MenuItem key={idx} value={option}>{option}</MenuItem>)}
      </Select>
    </FormControl>
  );
};

export default Selection;