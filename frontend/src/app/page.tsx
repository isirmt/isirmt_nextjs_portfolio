import { delaGothicOne } from "@/lib/fonts";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section
        aria-label="top-view"
        className="relative h-dvh w-full bg-gray-50"
      >
        <div
          className="absolute size-full font-dot flex items-center leading-none justify-center text-8xl"
        >
          isirmt
        </div>
      </section>
      <nav className="bg-gray-200/80 sticky h-20 top-0 -mt-20 z-50 w-full">
        <ul className="h-full w-full flex justify-start gap-6 items-center px-10 font-dot tracking-wide">
          <li><a className="inline-flex flex-col items-center justify-center">
            <div className="text-2xl leading-none">Profile</div>
            <div className="text-sm leading-none">プロフィール</div>
          </a></li>
        </ul>
      </nav>
      <section
        aria-label="profile"
        className="relative w-full"
      >
        <div className="relative z-10 mt-32 w-4/5 bg-[#ffe7bb] [box-shadow:.5rem_.5rem_0_0_#f7885c] rounded-tr-4xl">
          <div className="absolute -top-10 font-dot left-24 flex flex-col justify-center items-center">
            <div className="text-6xl tracking-wider leading-none">入本聖也</div>
            <div className="text-3xl tracking-wide leading-none font-semibold">seiya irimoto</div>
          </div>
          <div className="flex ml-36 gap-10 py-24">
            <div className="flex flex-col items-end gap-6">
              <div className="size-48 rounded-2xl overflow-hidden">
                <Image src={"/isirmt_icon.webp"} width={192} height={192} alt="isirmt_icon" />
              </div>
              <button className="size-12 bg-[#f7885c] rounded-2xl"></button>
            </div>
            <div className="text-lg font-semibold text-[#61230b] flex flex-col gap-6 tracking-wide">
              <div>2004年 3月 8日生</div>
              <div>千葉大学工学部総合工学科医工学コース</div>
              <div>プログラミング等を活用したアプリケーションを制作<br />イラスト・音楽・映像等も組み合わせた作品の制作にも挑戦中</div>
            </div>
          </div>
        </div>
        <div className="bg-[#c6f4ff] py-20 relative -mt-6 flex flex-col items-center justify-center">
          <div className="w-fit flex flex-col gap-3">
            <div className={`text-2xl text-[#054a5c] ${delaGothicOne.className}`}>資格</div>
            <ul className="ml-8 flex flex-col gap-3 text-[#054a5c]">
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
