import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Título / Logo / Title */}
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
            Rick & Morty App
          </Link>

          {/* Links de navegación / Navigation links */}
          <div className="flex gap-6">
            <Link 
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/dashboard"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Búsqueda
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}