import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="absolute top-6 left-6 z-50 hover:opacity-80 transition-opacity">
      <Image 
        src="/fona.svg" 
        alt="FONA Logo" 
        width={100} 
        height={40}
        className="h-10 w-auto"
        priority
      />
    </Link>
  );
}
