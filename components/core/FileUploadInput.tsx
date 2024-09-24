import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiX } from "react-icons/fi";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImageUp } from "lucide-react";

interface Props {
  aspectRatio?: string;
  className?: string;
  height?: string;
  style?: React.CSSProperties;
  variant?: "default" | "outline";
  defaultPhotoUrl?: string;
  onChange?: (file: File | null | undefined) => void;
}

export default function FileUploadInput({
  aspectRatio = "1",
  height,
  onChange,
  variant = "default",
  className = "",
  style = {},
  defaultPhotoUrl,
}: Props) {
  const [photo, setPhoto] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (defaultPhotoUrl) {
      setImageUrl(defaultPhotoUrl);
    }
  }, [defaultPhotoUrl]);

  useEffect(() => {
    if (onChange && photo) {
      onChange(photo);
      setImageUrl(undefined);
    }
  }, [photo, onChange]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhoto = acceptedFiles?.[0] || null;
    setPhoto(newPhoto);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const renderUploadPlaceholder = (currentlyDragging: boolean) =>
    currentlyDragging ? (
      <p className="m-0">Drop file to upload...</p>
    ) : (
      <ImageUp size={50} />
    );

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative cursor-pointer border-2 border-input rounded-lg",
        "flex justify-center items-center",
        className,
        variant === "outline" && "border border-gray-700"
      )}
      style={{ aspectRatio, height, ...style }}
    >
      <input {...getInputProps()} aria-label="file upload" />
      {!photo && !imageUrl && renderUploadPlaceholder(isDragActive)}

      {photo && (
        <Image
          src={photo ? URL.createObjectURL(photo) : (defaultPhotoUrl as string)}
          alt="Upload preview"
          layout="fill"
          objectFit="conver"
          className="rounded-lg"
        />
      )}

      {imageUrl && !photo && (
        <Image
          src={imageUrl}
          alt="Upload preview"
          layout="fill"
          objectFit="conver"
        />
      )}

      <button
        onClick={
          photo || imageUrl
            ? (e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                setPhoto(undefined);
                setImageUrl(undefined);
                if (onChange) {
                  onChange(null);
                }
              }
            : undefined
        }
        className={cn(
          "absolute bottom-1 right-1 w-6 h-6 rounded-full flex items-center justify-center",
          photo && "photo-selected",
          photo || imageUrl ? "bg-customRed text-black" : "bg-primary text-black"
        )}
        aria-label="photo"
      >
        {photo || imageUrl ? <FiX /> : "+"}
      </button>
    </div>
  );
}
