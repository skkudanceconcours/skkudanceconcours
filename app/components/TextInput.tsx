import { ReactNode, RefObject } from "react";
import { Box, FormHelperText, TextField } from "@mui/material";

type TextInputProps = {
  className?: string;
  label: string;
  ref?: RefObject<HTMLInputElement>;
  error: boolean;
  helperText?: string;
  disabled?: boolean;
  value?: string;
};

const TextInput = ({ className, label, ref, error, helperText, disabled,  value }: TextInputProps): ReactNode => {
  return (
    <div className={`${className} w-fit my-8`}>
      <Box sx={{ width: 160 }}>
        <TextField 
          variant = "standard"
          label = {label} 
          ref = {ref} 
          error = {error}
          disabled = {disabled}
          value = {value}
        />
        <FormHelperText className="text-[10px] absolute">{helperText}</FormHelperText>
      </Box>
    </div>
  );
};

export default TextInput;
