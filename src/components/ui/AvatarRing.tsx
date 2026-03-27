import Image from 'next/image'

interface AvatarRingProps {
  src: string
  alt: string
  size?: number
}

export default function AvatarRing({ src, alt, size = 80 }: AvatarRingProps) {
  return (
    <div className="avatar-ring">
      <div
        className="rounded-full overflow-hidden bg-page-bg"
        style={{ width: size, height: size }}
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  )
}
