import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r">
      <nav className="max-w-[720px] mx-auto flex justify-between items-center px-4 py-4">
        <Link
          href="/"
          className="text-black text-2xl font-bold hover:text-yellow-400 hover:scale-105 transition duration-300 ease-in-out"
        >
          Doseung
        </Link>

        <ul className="flex space-x-8">
          <li>
            <Link href="/about" className="text-black hover:text-gray-200 text-sm font-medium transition duration-300">
              About
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-black hover:text-gray-200 text-sm font-medium transition duration-300">
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-black hover:text-gray-200 text-sm font-medium transition duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
