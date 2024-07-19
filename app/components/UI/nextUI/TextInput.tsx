import { Input } from "@nextui-org/react";
import React, { ForwardedRef, ReactNode } from "react";

type TextInputProps = {
  className?: string
  label?: string
  error?: boolean
  description?: string
  disabled?: boolean
  value?: string | undefined
  clearable?: boolean
  autoFocus?: boolean
  password?: boolean
  onChange?: () => void
};

const NextTextInput = React.forwardRef<HTMLInputElement, TextInputProps>(({ className, label, error, description, disabled, value, clearable, autoFocus, password, onChange }: TextInputProps, ref: ForwardedRef<HTMLInputElement>): ReactNode => {
  return (
    <div className={`${className} w-52 h-20 my-6`}>
      <Input
        isClearable={clearable ?? true}
        type={password ? 'password' : 'text'}
        label={label}
        variant="underlined"
        description={description}
        value={value}
        className="max-w-xs"
        isInvalid = {value ? false : error}
        isDisabled = {disabled}
        onChange={onChange}
        ref={ref}
        autoFocus={autoFocus}
        
    />
    </div>
  );
});

NextTextInput.displayName = "TextInput";

export default NextTextInput;
