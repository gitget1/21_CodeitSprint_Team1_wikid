
import { useRouter } from 'next/router';

export default function WikiPage() {
  const router = useRouter();
  const { code } = router.query;

  return (
    <div>
      <h1>위키: {code ?? '(로딩 중)'}</h1>
      <p>코드별 위키 페이지 (임시)</p>
    </div>
  );
}
