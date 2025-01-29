import Image from 'next/image';
import MainContent from './components/Main';

export default function HomePage() {
  return (
    <MainContent>
      <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
      <p className="text-lg text-gray-600">Explore my projects, learn more about me, and get in touch!</p>
    </MainContent>
  );
}
