import { ChangeEvent, ForwardedRef,ReactNode, RefObject, forwardRef } from "react";

import {NextUIProvider, Select, SelectItem } from "@nextui-org/react";
import React from "react";

type SelectionProps = {
  className?: string;
  value: string;
  onChange: (value:string)=>void;
  label: string;
  placeholder: string;
  options: string[];
  error: boolean;
  disabled?: boolean;
  width?:number;
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
      width
    }: SelectionProps,
    ref: ForwardedRef<HTMLInputElement>
  ): ReactNode => {
    return (
      
      <NextUIProvider>
    <div className={`${className} w-52 h-20 my-6`}>
      <Select 
        label={label}
        variant="underlined"
        style={{width: width || "13rem"}}
        isInvalid = {error}
        value={value}
        placeholder={placeholder}
        isDisabled={disabled}
        ref={ref as RefObject<HTMLSelectElement>}
        onChange={(e:ChangeEvent<HTMLSelectElement>) =>{
          console.log(e.target.value)
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
    </NextUIProvider>

    );
  }
);

Selection.displayName = "Selection";

export default Selection;
