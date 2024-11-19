import Image from 'next/image'

export default function Logo() {
  return (
    <div>
      <Image
        src='/images/site/us-flag.svg'
        alt='Logo'
        width={60}
        height={34.5}
      />

      <p>Blog about English</p>
    </div>
  )
}
