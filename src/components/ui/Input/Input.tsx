import type React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  success?: boolean;
}

const Input = ({
  type = 'text',
  error = false,
  errorMessage,
  disabled = false,
  success = false,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-[10px] w-[400px]">
      <input
        type={type}
        disabled={disabled}
        className={`
          indent-[14px]  h-[45px] px-[20px]  py-[14px]  rounded-[10px] border text-sm  outline-none
          ${success ? 'border-[rgba(76,191,164,1)]' : error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
         
        `}
        {...props}
      />

      {error && errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default Input;
