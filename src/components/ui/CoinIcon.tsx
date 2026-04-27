import Image from 'next/image'

interface CoinIconProps {
  size?: number
  className?: string
}

export default function CoinIcon({ size = 16, className }: CoinIconProps) {
  return (
    <Image
      src="/credit.png"
      alt=""
      width={size}
      height={size}
      className={`object-contain shrink-0 ${className ?? ''}`}
    />
  )
}
