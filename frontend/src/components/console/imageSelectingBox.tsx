/* eslint-disable @next/next/no-img-element */
'use client';

import { CommonImage } from "@/types/images/common";
import { useEffect, useState } from "react";

type ImageSelectingBoxProps = {
  onChange: (ids: string[]) => void;
  multiple?: boolean;
};

export default function ImageSelectingBox({ onChange, multiple }: ImageSelectingBoxProps) {
  const [images, setImages] = useState<CommonImage[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/api/images");
      const parsedImages = (await response.json()) as CommonImage[];
      setImages(parsedImages);
    };

    fetchImages();
  }, []);

  useEffect(() => {
    onChange(selectedIds)
  }, [onChange, selectedIds]);

  return <div className="w-full flex flex-col gap-4 relative bg-[#f8f8f8] p-4">
    <p>{multiple ? "複数選択可能" : "一つを選択"}</p>
    <div className="flex gap-4 flex-wrap w-full">
      {images.map((image, imageIdx) => (
        <button
          key={imageIdx}
          className={`size-24 bg-white shadow-[.25rem_.25rem_0_0_#67c8e6] rounded aspect-square relative overflow-hidden cursor-pointer border-2 ${selectedIds.includes(image.id) ? "border-[#65a6df]" : "border-[#67c8e6]"}`}
          onClick={(e) => {
            e.preventDefault();
            setSelectedIds((prev) => {
              if (multiple) {
                const exists = prev.includes(image.id);
                return exists ? prev.filter((id) => id !== image.id) : [...prev, image.id];
              }

              return [image.id];
            });
          }}
        >
          <div className={`absolute flex items-center justify-center top-0 left-0 size-full z-1 transition-all duration-200 ${selectedIds.includes(image.id) ? "bg-[#65a6df]/75" : "bg-transparent hover:bg-[#65a6df]/75"}`}>
            <div className={`rounded-full border-4 border-white size-16 flex justify-center items-center transition-all duration-200 ${selectedIds.includes(image.id) ? "opacity-100" : "opacity-0"}`}>
              {multiple && selectedIds.includes(image.id) && (
                <div className="leading-none text-4xl whitespace-nowrap font-black text-white">
                  {selectedIds.findIndex((id) => image.id === id) + 1}
                </div>)}
            </div>
          </div>
          <img
            className="relative object-contain pointer-events-none"
            src={`/api/images/${image.id}`}
            alt={image.file_name}
          />
        </button>
      ))}
    </div>

  </div>
}
