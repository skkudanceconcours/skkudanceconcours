import React, { ForwardedRef, ReactNode } from "react";
import { Box, FormHelperText, TextField } from "@mui/material";

type TextInputProps = {
  className?: string
  label: string
  error: boolean
  helperText?: string
  disabled?: boolean
  value?: string
  onChange?: () => void
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(({ className, label, error, helperText, disabled, value, onChange }: TextInputProps, ref: ForwardedRef<HTMLInputElement>): ReactNode => {
  return (
    <div className={`${className} w-fit my-6`}>
      <Box sx={{ width: 160 }}>
        <TextField 
          variant = "standard"
          label = {label} 
          inputRef = {ref} 
          error = {error}
          disabled = {disabled}
          value = {value}
          onChange = {onChange}
        />
        <FormHelperText className="text-[10px] absolute">{helperText}</FormHelperText>
      </Box>
    </div>
  );
});

TextInput.displayName = "TextInput";

export default TextInput;
