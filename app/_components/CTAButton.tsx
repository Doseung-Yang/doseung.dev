import Link from 'next/link';
import { motion } from 'framer-motion';

interface CTAButtonProps {
  href: string;
  text: string;
  icon?: React.ReactNode;
}

export default function CTAButton({ href, text, icon }: CTAButtonProps) {
  return (
    <Link href={href} passHref>
      <motion.div className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-300 transition cursor-pointer">
        {icon && <span>{icon}</span>}
        {text}
      </motion.div>
    </Link>
  );
}
