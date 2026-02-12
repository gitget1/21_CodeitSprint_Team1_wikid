import { withAuth } from '@/components/auth/withAuth';

import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";

const labelStyle = `h-[45px] text-gray-500 py-2.25 px-3.75 flex gap-4 items-center justify-start rounded-[10px] bg-gray-100`;


function MyPage() {

  const handleSubmit = (data: any) => {
    console.log(data);
  };
  
  return (
    <div className="flex flex-col items-center m-auto my-15">
      <h1 className="text-2xl-semibold text-gray-500">계정 설정</h1>
      <form
        noValidate
        className="w-84 md:w-100 flex flex-col gap-6 mt-12.5 relative"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-[10px]">
          <span className="text-md-regular text-gray-500">비밀번호 변경하기</span>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="oldPassword"
                className={`${labelStyle}`}
              >
                <Input
                  type="password"
                  id="oldPassword"
                  placeholder="기존 비밀번호"
                  className="w-full"
                />
              </label>
              <label
                htmlFor="newPassword"
                className={`${labelStyle}`}
              >
                <Input
                  type="password"
                  id="newPassword"
                  placeholder="새 비밀번호"
                  className="w-full"
                />
                </label>
              <label
                htmlFor="newPasswordConfirm"
                className={`${labelStyle}`}
              >
                <Input
                  type="password"
                  id="newPasswordConfirm"
                  placeholder="새 비밀번호 확인"
                  className="w-full"
                />
                </label>
            </div>
          </div>


        <Button type="submit" disabled={false} fullWidth className="w-[89px] h-[40px] absolute bottom-0 right-0">
          변경하기
        </Button>
      </form>
      </div>
  );
}
export default withAuth(MyPage);