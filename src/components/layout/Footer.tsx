function Footer() {
  return (
    <div className="flex min-w-0 max-w-full flex-col items-start justify-center bg-gray-600 px-5 py-10 md:px-12 md:py-15 xl:h-[270px] xl:p-20">
      <span className="text-gray-50 md:text-lg-bold text-xxs-bold">
        Copyright ⓒ Wikied. All Rights Reserved
      </span>
      <span className="mt-[10px] max-w-full break-words text-gray-50 text-xxs-regular md:text-md-regular">
        사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 | 대표 : 이지은 서울특별시
        중구 청계천로 123, 위키드빌딩 <br />
        서울특별시 중구 청계천로 123, 위키드빌딩
      </span>
      <div className="mt-5 flex min-w-0 max-w-full flex-wrap items-center justify-start gap-4 md:mt-[30px] md:gap-[30px]">
        <a href="" className="text-gray-50 text-xxs-medium md:text-md-medium">
          서비스 이용약관
        </a>
        <a href="" className="text-gray-50 text-xxs-medium md:text-md-medium">
          개인정보 취급방침
        </a>
        <a href="" className="text-gray-50 text-xxs-medium md:text-md-medium">
          전자금융거래 기본약관
        </a>
      </div>
    </div>
  );
}

export default Footer;
