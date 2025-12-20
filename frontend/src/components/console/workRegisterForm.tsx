'use client';

import React, { useCallback, useState } from "react";
import ImageSelectingBox from "./imageSelectingBox";

const LabelBox = ({ children, isLong }: { children: React.ReactNode, isLong?: boolean }) => {
  return <div className={`flex px-2 flex-col gap-2 ${isLong ? "col-span-2" : "col-span-1"}`}>
    {children}
  </div>
}

const LabelText = ({ children, required }: { children: React.ReactNode, required?: boolean }) => {
  return <p className="flex gap-0.5 font-bold text-sm text-[#7e11d1]">
    {children}{required && <span className="text-[#e04787]">*</span>}
  </p>
}

export default function WorkRegisterForm() {
  const [inputSlug, setInputSlug] = useState<string>("");
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputComment, setInputComment] = useState<string>("");
  const [inputPublishedDate, setInputPublishedDate] = useState<string>("");
  const [inputAccentColor, setInputAccentColor] = useState<string>("");
  const [inputThumbnailImage, setInputThumbnailImage] = useState<string>("");
  const [inputWorkImages, setInputWorkImages] = useState<string[]>([]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, [])

  const handleThumbnailSelected = useCallback((id: string[]) => {
    setInputThumbnailImage(id.length ? id[0] : "");
  }, [])

  const handleWorkImagesSelected = useCallback((id: string[]) => {
    setInputWorkImages(id);
  }, []);


  return <section className="relative flex w-full flex-col space-y-4">
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LabelBox>
          <LabelText required>
            識別パス
          </LabelText>
          <input
            name="slug"
            value={inputSlug}
            onChange={(e) => setInputSlug(e.target.value)}
            required
            placeholder="work_name"
            className="w-full border-b-2 focus:border-[#7e11d1] px-4 py-2 outline-none border-[#c68ef0]"
          />
        </LabelBox>
        <LabelBox>
          <LabelText required>
            制作物名
          </LabelText>
          <input
            name="title"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            required
            placeholder="アプリケーション名"
            className="w-full border-b-2 focus:border-[#7e11d1] px-4 py-2 outline-none border-[#c68ef0]"
          />
        </LabelBox>
        <LabelBox isLong>
          <LabelText required>
            コメント
          </LabelText>
          <input
            name="comment"
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
            required
            placeholder="ここに一言コメント！"
            className="w-full border-b-2 focus:border-[#7e11d1] px-4 py-2 outline-none border-[#c68ef0]"
          />
        </LabelBox>
        <LabelBox>
          <LabelText required>
            作成日
          </LabelText>
          <input
            name="published_date"
            value={inputPublishedDate}
            onChange={(e) => setInputPublishedDate(e.target.value)}
            type="date"
            required
            className="w-full border-b-2 focus:border-[#7e11d1] px-4 py-2 outline-none border-[#c68ef0]"
          />
        </LabelBox>
        <LabelBox>
          <LabelText required>
            アクセントカラー
          </LabelText>
          <input
            name="accent_color"
            value={inputAccentColor}
            onChange={(e) => setInputAccentColor(e.target.value)}
            type="color"
            required
            className="w-full"
          />
        </LabelBox>
        <LabelBox isLong>
          <LabelText required>
            サムネイル
          </LabelText>
          <ImageSelectingBox onChange={handleThumbnailSelected} />
        </LabelBox>
        <LabelBox isLong>
          <LabelText required>
            参考画像
          </LabelText>
          <ImageSelectingBox multiple onChange={handleWorkImagesSelected} />
        </LabelBox>
        <LabelBox isLong>
          <input
            type="submit"
            className="w-full bg-[#67c8e6] py-2 text-center text-xl cursor-pointer px-4 block select-none font-bold hover:bg-[#48a3be] text-white relative top-0 transition-all [box-shadow:0_.15rem_0_0_#67c8e6] hover:[box-shadow:0_.05rem_0_0_#48a3be] hover:top-[.1rem]"
          />
        </LabelBox>
      </div>
    </form>
  </section>
}