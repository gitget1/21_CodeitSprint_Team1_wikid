import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

import Input from '@/components/ui/Input/Input';

const labelStyle = `h-[45px] text-gray-500 py-2.25 px-3.75 flex gap-4 items-center justify-start rounded-[10px] mt-2.5`;

interface FormInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
  error?: FieldError;
  isSubmitted?: boolean;
}

export default function FormInput<T extends FieldValues>({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  rules,
  error,
  isSubmitted,
}: FormInputProps<T>) {
  return (
    <div>
      <span className="text-md-regular text-gray-500">{label}</span>
      <label
        htmlFor={name}
        className={`${labelStyle} ${error ? 'bg-secondary-red-100' : 'bg-gray-100'}`}
      >
        <Input
          type={type}
          id={name}
          placeholder={placeholder}
          className="w-full"
          {...register(name, rules)}
          aria-invalid={isSubmitted ? (error ? 'true' : 'false') : undefined}
        />
      </label>
      {error && (
        <span role="alert" className="mt-2.5 text-xs-regular text-secondary-red-200">
          {error.message}
        </span>
      )}
    </div>
  );
}
