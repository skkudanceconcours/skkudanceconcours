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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = (e.target as HTMLElement).closest("form");
      if (!form) return;
      const inputs = Array.from(form.querySelectorAll<HTMLInputElement>("input:not([type=hidden]):not([tabindex='-1'])"));
      const currentIndex = inputs.indexOf(e.target as HTMLInputElement);
      if (currentIndex >= 0 && currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      }
    }
  };

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
        onKeyDown={handleKeyDown}
        ref={ref}
        autoFocus={autoFocus}

    />
    </div>
  );
});

NextTextInput.displayName = "TextInput";

export default NextTextInput;
