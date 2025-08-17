"use client"
import { useState } from "react";
import { User as UserIcon } from "lucide-react";

export default function Avatar({ src, alt = "Usuario", size = 64, className = "" }) {
  const [error, setError] = useState(false);
  const showImage = Boolean(src && !error);
  const px = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      className={`rounded-full border border-gray-200 bg-gray-100 overflow-hidden flex items-center justify-center ${className}`}
      style={{ width: px, height: px }}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <UserIcon className="w-1/2 h-1/2 text-gray-400" aria-label="Usuario sin foto" />
      )}
    </div>
  );
}
