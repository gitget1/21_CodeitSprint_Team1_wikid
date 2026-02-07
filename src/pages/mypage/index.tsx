import React, { useState } from 'react';

import Dropdown from '@/components/ui/Dropdown/Dropdown';
import Input from '@/components/ui/Input/Input';

export default function Page() {
  const [question, setQuestion] = useState<string | undefined>(undefined);
  const [name, setName] = useState('');

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
      </div>
    </div>
  );
}
