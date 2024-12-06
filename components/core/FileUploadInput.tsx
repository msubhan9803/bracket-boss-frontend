import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiTrash, FiX } from "react-icons/fi";
import Image from "next/image";
import { ImageUp } from "lucide-react";
import { AiOutlineFileExcel } from "react-icons/ai";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  aspectRatio?: string;
  className?: string;
  height?: string;
  style?: React.CSSProperties;
  variant?: "default" | "outline";
  defaultPhotoUrl?: string;
  onChange?: (file: File | null | undefined) => void;
  allowedTypes?: {
    type: string;
    label: string;  
  }[];
}

export default function FileUploadInput({
  aspectRatio = "1",
  height,
  onChange,
  variant = "default",
  className = "",
  style = {},
  defaultPhotoUrl,
  allowedTypes = [
    {
      type: "image/*",
      label: "Image"
    }
  ],
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
    accept: allowedTypes.reduce((acc: any, type: any) => {
      acc[type.type] = [];
      return acc;
    }, {}),
    onDropRejected: (fileRejections) => {
      const fileRejection = fileRejections[0];
      if (fileRejection.errors[0].code === "file-invalid-type") {
        const allowedTypesString = allowedTypes.map(type => type.label).join(", ");
        toast.error(`Invalid file type. Only the following file types are allowed: ${allowedTypesString}`);
      }
    }
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

      {photo && photo.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
        <div className="flex flex-col items-center">
          <AiOutlineFileExcel className="text-primary" size={50} />
          <p className="my-4 text-center">{photo.name}</p>
        </div>
      )}

      {photo && photo.type.startsWith("image/") && (
        <Image
          src={URL.createObjectURL(photo)}
          alt="Upload preview"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      )}

      {imageUrl && !photo && (
        <Image
          src={imageUrl}
          alt="Upload preview"
          layout="fill"
          objectFit="cover"
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
        {photo || imageUrl ? <FiTrash /> : "+"}
      </button>
    </div>
  );
}