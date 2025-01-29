export default function Footer() {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto text-center text-yellow-400">
        <p className="mb-4 text-sm">© Copyright © 2025 Doseung Yang</p>

        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300"
          >
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.5v-2c-3.4.7-4.2-1.6-4.2-1.6-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.8-1.3-2.7-.3-5.6-1.3-5.6-6a4.6 4.6 0 0 1 1.3-3.2 4.2 4.2 0 0 1 .1-3.2s1-.3 3.2 1.3a11 11 0 0 1 5.7 0c2.1-1.6 3.1-1.3 3.1-1.3a4.2 4.2 0 0 1 .1 3.2 4.6 4.6 0 0 1 1.3 3.2c0 4.7-2.8 5.7-5.6 6 .4.4.8 1.1.8 2.1v3.1c0 .3.2.6.8.5A12 12 0 0 0 12 .5" />
            </svg>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300"
          >
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M24 4.6a9.7 9.7 0 0 1-2.8.8 5 5 0 0 0 2.1-2.8 9.8 9.8 0 0 1-3.1 1.3A5 5 0 0 0 12 9.3c0 .4 0 .8.1 1.2A14 14 0 0 1 1.7 3.2a4.9 4.9 0 0 0-.7 2.5 5 5 0 0 0 2.2 4.2 5 5 0 0 1-2.2-.6v.1a5 5 0 0 0 4 4.9 5.1 5.1 0 0 1-1.3.2 5 5 0 0 1-1-.1 5 5 0 0 0 4.7 3.5A10 10 0 0 1 0 20a14 14 0 0 0 7.5 2.2c9 0 14-7.5 14-14v-.7A10.4 10.4 0 0 0 24 4.6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
