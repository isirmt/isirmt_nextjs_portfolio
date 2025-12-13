import { delaGothicOne } from "@/lib/fonts";
import { InformationSite } from "./latestNews";

export default function Footer() {
  return <footer className="bg-[#67c8e6]">
    <section className="py-12 flex flex-col items-center justify-center">
      <div className={`text-4xl text-white ${delaGothicOne.className}`}>情報発信中サイト</div>
      <div className="flex my-10 text-white gap-12">
        <InformationSite
          siteUrl="https://itomiri.com"
          feedUrl="https://itomiri.com/feed"
          siteName="井筒ミリ オフィシャルサイト"
          siteImagePath="/itomiri_com_ogp.png"
          siteDescription="「井筒ミリ」名義での活動を告知・紹介するサイト"
        />
        <InformationSite
          siteUrl="https://blog.isirmt.com"
          feedUrl="https://blog.isirmt.com/feed"
          siteName="isirmt ブログ"
          siteImagePath="/blog_isirmt_com_ogp.png"
          siteDescription="「isirmt」名義で技術ブログを運用中"
        />
      </div>
    </section>
    <div className="aspect-1235/110 bg-[url('/name_footer.svg')] bg-no-repeat bg-center" />
  </footer>
}