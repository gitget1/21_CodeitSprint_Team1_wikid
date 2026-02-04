import Dropdown from "@/components/ui/Dropdown/Dropdown";
import Input from "@/components/ui/Input/Input";
import TextArea from "@/components/ui/Textarea/Textarea";
import { useState } from "react";

export default function Page() {
   const [selectedValue, setSelectedValue] = useState<string>("");
    const [question, setQuestion] = useState<string | undefined>(undefined);
const [name, setName] = useState('');
const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    // 여기서 API 호출 등 처리
    console.log("submit", { title, content });
  };

  const handleCancel = () => {
    // 취소 시 초기화 or 뒤로가기 등
    setTitle("");
    setContent("");
  };

  const options = [
    { label: '배송 문의', value: 'delivery' },
    { label: '환불 요청', value: 'refund' },
    { label: '상품 문의', value: 'product' },
    { label: '기타', value: 'etc' },
  ];

  return (
    <div className="flex mt-2.5 gap-[32px]">

     <div className="w-[300px] p-10">
      <Dropdown
        options={options}
        value={question}
        onChange={(v) => setQuestion(v)}
        placeholder="문의 유형 선택"
      />
      </div>
      <div className="p-10">
      <Input
        placeholder="이름을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      </div>
      <div className="max-w-3xl mx-auto p-6">
      <TextArea
        heading="게시물 등록하기"
        dateText="2026.02.05"
        submitLabel="등록하기"
        title={title}
        content={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSubmitClick={handleSubmit}
        onCancelClick={handleCancel}
        maxTitleLength={30}
        loading={false}
        disabled={false}
      />
    </div>
</div>

  );
}