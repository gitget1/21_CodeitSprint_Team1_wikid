import { ChangeEvent } from 'react';
import { MagnifyIcon } from '@/assets/icons/Magnify';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  placeholder: string;
  id: string;
}

function Searchbar({ value, placeholder, id, ...props }: SearchBarProps) {
  const hasValue = value.length > 0;

  return (
    <label
      htmlFor={id}
      className={`
        py-2 px-4
        flex gap-4
        items-center
        justify-start
        rounded-[10px]
        ${hasValue ? 'bg-gray-100' : 'bg-gray-50 focus-within:bg-gray-100'}`}
    >
      <MagnifyIcon className=" text-gray-400" />
      <input
        type="text"
        id={id}
        value={value}
        placeholder={placeholder}
        className="w-full"
        onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange?.(e)}
        {...props}
      />
    </label>
  );
}

export default Searchbar;
