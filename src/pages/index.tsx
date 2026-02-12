import HeroSection from "@/components/Home/HeroSection";
import WriteSection from "@/components/Home/WriteSection";
// import ShareSection from "@/components/Home/ShareSection";
import ViewSection from "@/components/Home/ViewSection";
import CtaSection from "@/components/Home/CtaSection";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <WriteSection />
      {/* <ShareSection /> */}
      <ViewSection />
      <CtaSection />
    </div>
  );
}
