import { useState } from 'react';

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const Dropdown = ({ options, value, placeholder = '질문 선택', onChange }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((e) => e.value === value);
  return (
    <div>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className=" h-[45px] px-[20px] rounded-[10px] text-sm border border-gray-300
bg-white flex items-center justify-between"
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-400 '}>
          {selected?.label || placeholder}
        </span>
        <span className="text-gray-400">▾</span>{' '}
      </div>
      {open && (
        <div className="  rounded-[10px] border border-gray-300 flex flex-col mt-[2px] ">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
              className=" font-normal text-sm leading-[24px]
         indent-[20px] hover:bg-green-100 cursor-pointer  h-[35px] flex items-center"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
