'use client';

interface UserProfileImageProps {
  src: string | undefined;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export default function UserProfileImage({ 
  src, 
  alt, 
  className = "h-24 w-24 rounded-full object-cover border-4 border-gray-300",
  fallbackSrc = "/images/user.jpg"
}: UserProfileImageProps) {
  return (
    <img
      className={className}
      src={src || fallbackSrc}
      alt={alt}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = fallbackSrc;
      }}
    />
  );
} 