import { ChangeEvent, ForwardedRef,ReactNode, RefObject, forwardRef, useState } from "react";

import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

type SelectionProps = {
  className?: string;
  value: string;
  onChange: (value:string)=>void;
  label: string;
  placeholder?: string;
  options: string[];
  error: boolean;
  disabled?: boolean;
  width?:number;
};

const NextSelection = forwardRef<HTMLInputElement, SelectionProps>(
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
      width
    }: SelectionProps,
    ref: ForwardedRef<HTMLInputElement>
  ): ReactNode => {
    const [isOpen, setIsOpen] = useState(false);

    return (

    <div
      className={`${className} w-52 h-20 my-6 cursor-pointer`}
      onClick={() => { if (!disabled) setIsOpen(true); }}
    >
      <Select
        label={label}
        variant="underlined"
        style={{width: width || "13rem"}}
        isInvalid = {error}
        value={value}
        placeholder={placeholder}
        selectedKeys={value ? [value] : []}
        isDisabled={disabled}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        ref={ref as RefObject<HTMLSelectElement>}
        onChange={(e:ChangeEvent<HTMLSelectElement>) =>{
          onChange(e.target.value)
        }}

      >
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </Select>
    </div>

    );
  }
);

NextSelection.displayName = "Selection";

export default NextSelection;
