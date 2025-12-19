'use client';

import { CommonImage } from "@/types/images/common";
import { useEffect, useState } from "react";
import Image from "next/image";


export default function ImagesViewer() {
  const [images, setImages] = useState<CommonImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/api/images");
      const parsedImages = await response.json() as CommonImage[];
      setImages(parsedImages)
    }

    fetchImages();
  }, [])

  useEffect(() => {
    console.log(images);
  }, [images])

  return <section className="bg-[#f8f8f8] px-4 py-4">
    <div className="flex flex-wrap gap-4">
      {images.map((image, imageIdx) => (
        <button
        className="size-36 bg-white relative" 
        key={imageIdx}>
          <Image src={`/api/${image.id}`} alt={image.file_name} fill objectFit="contain" />
        </button>))}
    </div>
  </section>
}