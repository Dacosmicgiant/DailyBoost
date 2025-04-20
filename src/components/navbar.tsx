// components/Navbar.tsx

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          MyApp
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link href="/settings" className="hover:underline">
              settings
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
