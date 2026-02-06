function Footer() {
  return (
    <div
      className="
    sm:27.5 md:38
    xl:h-67.5 xl:p-20
    md:px-12 md:py-15
    px-5 py-10
    bg-gray-600
    flex flex-col
    justify-center
    items-start"
    >
      <span className="text-gray-50 md:text-lg-bold text-xxs-bold">
        Copyright ⓒ Wikied. All Rights Reserved
      </span>
      <span className="text-gray-50 md:text-md-regular text-xxs-regular mt-2.5">
        사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 | 대표 : 이지은 서울특별시
        중구 청계천로 123, 위키드빌딩 <br />
        서울특별시 중구 청계천로 123, 위키드빌딩
      </span>
      <div className="flex items-center justify-start gap-7.5 mt-5 md:mt-7.5">
        <a href="" className="text-gray-50 md:text-md-medium text-xxs-medium">
          서비스 이용약관
        </a>
        <a href="" className="text-gray-50 md:text-md-medium text-xxs-medium">
          개인정보 취급방침
        </a>
        <a href="" className="text-gray-50 md:text-md-medium text-xxs-medium">
          전자금융거래 기본약관
        </a>
      </div>
    </div>
  );
}

export default Footer;
