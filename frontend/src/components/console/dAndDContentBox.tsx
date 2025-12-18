"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type FileUploadingState = {
  id: string;
  file: File;
  status: "pending" | "uploading" | "success" | "error";
  errorMessage?: string;
};

export default function DAndDContentBox() {
  const inputtingFileButtonRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [fileUploadingStates, setFileUploadingStates] = useState<
    FileUploadingState[]
  >([]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const uploadFile = useCallback(async (id: string, file: File) => {
    setFileUploadingStates((prev) =>
      prev.map((state) =>
        state.id === id ? { ...state, status: "uploading" } : state,
      ),
    );

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });

      if (response.ok)
        setFileUploadingStates((prev) =>
          prev.map((state) =>
            state.id === id ? { ...state, status: "success" } : state,
          ),
        );
      else
        setFileUploadingStates((prev) =>
          prev.map((state) =>
            state.id === id
              ? {
                  ...state,
                  status: "error",
                  errorMessage: "アップロードに失敗",
                }
              : state,
          ),
        );
    } catch (error) {
      setFileUploadingStates((prev) =>
        prev.map((state) =>
          state.id === id
            ? {
                ...state,
                status: "error",
                errorMessage:
                  error instanceof Error ? error.message : "アップロードに失敗",
              }
            : state,
        ),
      );
    }
  }, []);

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const newStates: FileUploadingState[] = Array.from(files).map(
        (file, index) => ({
          id: `${Date.now()}-${index}-${file.name}`,
          file,
          status: "pending",
          errorMessage: undefined,
        }),
      );

      setFileUploadingStates((prev) => {
        return [...prev, ...newStates];
      });

      newStates.forEach(({ id, file }) => {
        uploadFile(id, file);
      });
    },
    [uploadFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLInputElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files?.length) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles],
  );

  const handleSelectingFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        handleFiles(e.target.files);
        e.target.value = "";
      }
    },
    [handleFiles],
  );

  useEffect(() => {
    console.log(fileUploadingStates);
  }, [fileUploadingStates]);

  return (
    <section className="relative flex w-full flex-col space-y-4 px-16">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex w-full flex-col items-center justify-center gap-3 px-6 py-3 font-semibold text-[#7e11d1] transition-all duration-200 select-none ${isDragging ? "bg-[#dcbff3]" : "bg-[#f6eaff]"}`}
      >
        <div className="text-3xl">画像登録</div>
        <div className="flex items-center justify-center gap-3">
          <div className="flex size-30 items-center justify-center border-2 border-dotted text-center text-2xl leading-none">
            ドラッグ
            <br />&<br />
            ドロップ
          </div>
          <div>または</div>
          <button
            onClick={() => inputtingFileButtonRef.current?.click()}
            className="flex size-30 cursor-pointer items-center justify-center border-2 border-dotted text-center text-2xl leading-none transition-all duration-200 hover:bg-[#dcbff3]"
          >
            ファイルを
            <br />
            選択
          </button>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            ref={inputtingFileButtonRef}
            onChange={handleSelectingFiles}
          />
        </div>
      </div>
    </section>
  );
}
