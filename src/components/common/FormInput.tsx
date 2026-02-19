import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import Input from '@/components/ui/Input/Input';

const labelStyle = `h-[45px] text-gray-500 py-2.25 px-3.75 flex gap-4 items-center justify-start rounded-[10px] mt-2.5`;

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  isSubmitted?: boolean;
  showLabel?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
  { label, type = 'text', placeholder, error, isSubmitted, className, name, showLabel = true, ...props },
  ref
) {
  return (
    <div>
      {showLabel && <span className="text-md-regular text-gray-500">{label}</span>}
      <label
        htmlFor={name}
        className={`${labelStyle} ${error ? 'bg-secondary-red-100' : 'bg-gray-100'}`}
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
