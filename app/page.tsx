'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center">
      {/* Logo */}
      <div className="mb-5">
        <Image src="/logo.jpg" alt="SoleMate Logo" width={150} height={150} />
      </div>

      {/* Welcome Message */}
      <h1 className="mb-5 text-2xl text-gray-800">Welcome to SoleMate</h1>

      {/* Redirect Button */}
      <Link href="/assistant" className="inline-block px-5 py-2 bg-red-600 text-white rounded transition-colors hover:bg-blue-900">
          Go to your shoe assistant
      </Link>
    </div>
  );
}
