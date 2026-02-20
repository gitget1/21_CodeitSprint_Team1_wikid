import { forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';

import Input from '@/components/ui/Input/Input';

const labelStyle = `h-[45px] text-gray-500 py-2.25 px-3.75 flex gap-4 items-center justify-start rounded-[10px] mt-2.5`;

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  isSubmitted?: boolean;
  showLabel?: boolean;
  isValid?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
  { label, type = 'text', placeholder, error, isSubmitted, className, name, showLabel = true, isValid, onChange, ...props },
  ref
) {
  const [inputValue, setInputValue] = useState('');
  
  const getLabelBgColor = () => {
    if (error) return 'bg-secondary-red-100';
    const isFieldValid = isValid ?? (!!inputValue && !error);
    if (isFieldValid) return 'bg-primary-green-100';
    return 'bg-gray-100';
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div>
      {showLabel && <span className="text-md-regular text-gray-500">{label}</span>}
      <label
        htmlFor={name}
        className={`${labelStyle} ${getLabelBgColor()}`}
      >
        <Input
          ref={ref}
          type={type}
          id={name}
          placeholder={placeholder}
          className={`w-full ${className || ''}`}
          aria-invalid={isSubmitted ? (error ? 'true' : 'false') : undefined}
          name={name}
          error={false}
          onChange={handleChange}
          {...props}
        />
      </label>
      {error && (
        <span role="alert" className="mt-2.5 text-xs-regular text-secondary-red-200">
          {error.message}
        </span>
      )}
    </div>
  );
});

export default FormInput;
