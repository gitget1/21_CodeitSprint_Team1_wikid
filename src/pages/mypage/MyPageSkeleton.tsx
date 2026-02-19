import FormInputSkeleton from "@/components/ui/Skeleton/FormInputSkeleton"
import ButtonSkeleton from "@/components/ui/Skeleton/ButtonSkeleton"
import { Skeleton } from "@/components/ui/Skeleton/index"

export default function MyPageSkeleton() {
  return (
    <div className="flex flex-col items-center m-auto my-35">
      <Skeleton className="h-8 w-24 mb-16" />
      <form className="w-84 md:w-100 flex flex-col gap-4">
        <div>
          <Skeleton className="h-5 w-24 mb-2.5" />
          <FormInputSkeleton showLabel={false} />
          <FormInputSkeleton showLabel={false} />
          <FormInputSkeleton showLabel={false} />
        </div>
        <div className="flex justify-end">
          <ButtonSkeleton size="compact" className="w-[89px] !min-w-0 px-5 h-[40px]" />
        </div>
      </form>
      <Skeleton className="w-full h-px my-8" />
      <form className="w-84 md:w-100 flex flex-col gap-4">
        <div>
          <Skeleton className="h-5 w-24 mb-2.5" />
          <FormInputSkeleton showLabel={false} />
          <FormInputSkeleton showLabel={false} />
        </div>
        <div className="flex justify-end">
          <ButtonSkeleton size="compact" className="w-[89px] !min-w-0 px-5 h-[40px]" />
        </div>
      </form>
    </div>
  )
}
