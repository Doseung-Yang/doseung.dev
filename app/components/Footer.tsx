export default function Footer() {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto text-center text-white">
        <p className="mb-4 text-sm">© Copyright © 2025 Doseung Yang</p>

        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/Doseung-Yang"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition duration-300"
          >
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.5v-2c-3.4.7-4.2-1.6-4.2-1.6-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.8-1.3-2.7-.3-5.6-1.3-5.6-6a4.6 4.6 0 0 1 1.3-3.2 4.2 4.2 0 0 1 .1-3.2s1-.3 3.2 1.3a11 11 0 0 1 5.7 0c2.1-1.6 3.1-1.3 3.1-1.3a4.2 4.2 0 0 1 .1 3.2 4.6 4.6 0 0 1 1.3 3.2c0 4.7-2.8 5.7-5.6 6 .4.4.8 1.1.8 2.1v3.1c0 .3.2.6.8.5A12 12 0 0 0 12 .5" />
            </svg>
          </a>
          <a
            href="https://x.com/DoseungYang"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition duration-300"
          >
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M23.5 1h-4.9L14 8.3 8.2 1H.5L10 12.5.5 23h4.9l5.9-7.7 5.8 7.7h7.7L14.9 11.2 23.5 1zm-6.2 19.4-4.9-6.5-6.3 6.5H4.9l7-7.3-7.2-8.2h3.4l5.5 6.5 6.1-6.5h3.2l-6.6 7 7.1 8.5h-3.3z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
