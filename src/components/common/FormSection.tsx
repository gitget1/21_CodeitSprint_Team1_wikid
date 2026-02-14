import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';

interface FormField {
  name: string;
  label: string;
  type?: 'text' | 'password';
  placeholder: string;
}

interface FormSectionProps {
  title: string;
  fields: FormField[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitButtonText: string;
}

const labelStyle = `h-[45px] text-gray-500 py-2.25 px-3.75 flex gap-4 items-center justify-start rounded-[10px] mt-2.5 bg-gray-100`;

export default function FormSection({
  title,
  fields,
  onSubmit,
  submitButtonText,
}: FormSectionProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-84 md:w-100 flex flex-col gap-4"
    >
      <div>
        <span className="text-md-regular text-gray-500">{title}</span>
        {fields.map((field) => (
          <label
            key={field.name}
            htmlFor={field.name}
            className={labelStyle}
          >
            <Input
              type={field.type || 'text'}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              className="w-full"
            />
          </label>
        ))}
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="h-[40px] w-[89px]">
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
}
