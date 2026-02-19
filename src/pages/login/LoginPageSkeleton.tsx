import FormInputSkeleton from "@/components/ui/Skeleton/FormInputSkeleton"
import ButtonSkeleton from "@/components/ui/Skeleton/ButtonSkeleton"
import { Skeleton } from "@/components/ui/Skeleton/index"

export default function LoginPageSkeleton() {
  return (
    <div className="flex flex-col items-center m-auto my-15">
      <Skeleton className="h-8 w-20" />
      <form className="w-84 md:w-100 flex flex-col gap-6 mt-12.5">
        <FormInputSkeleton showLabel={true} />
        <FormInputSkeleton showLabel={true} />
        <ButtonSkeleton size="lg" fullWidth className="mt-2 h-[45px]" />
      </form>
      <Skeleton className="h-5 w-16 mt-10" />
    </div>
  )
}