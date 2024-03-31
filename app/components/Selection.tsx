import { ForwardedRef, ReactNode, Ref, forwardRef } from "react";
import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type SelectionProps = {
  className?: string;
  value: string;
  onChange: (value:string)=>void;
  label: string;
  placeholder: string;
  options: string[];
  error: boolean;
  disabled?: boolean;
};

const Selection = forwardRef<HTMLInputElement, SelectionProps>(
  (
    {
      className,
      value,
      onChange,
      label,
      placeholder,
      options,
      error,
      disabled,
    }: SelectionProps,
    ref: ForwardedRef<HTMLInputElement>
  ): ReactNode => {
    return (
      <div className={`${className} w-fit my-6`} ref={ref}>
        <FormControl
          className={`${className}`}
          variant="standard"
          sx={{ width: 160 }}
        >
          <InputLabel id="demo-simple-select-standard-label" error={error}>
            {label}
          </InputLabel>
          <Select
            variant="standard"
            labelId={label}
            id={label}
            value={value as string}
            onChange={(event: SelectChangeEvent) =>
              onChange(event.target.value)
            }
            label={label}
            placeholder={placeholder}
            error={error}
            disabled={disabled}
            inputRef={ref}
          >
            {(options as string[]).map((option, idx) => (
              <MenuItem key={idx} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
);

Selection.displayName = "Selection";

export default Selection;
