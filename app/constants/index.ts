import { createElement } from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiGithub,
  SiNodedotjs,
  SiAmazon,
  SiPython,
  SiMysql,
  SiZendesk,
} from 'react-icons/si';

export const skills = [
  { icon: SiReact, label: 'React' },
  { icon: SiNextdotjs, label: 'Next.js' },
  { icon: SiTailwindcss, label: 'Tailwind CSS' },
  { icon: SiTypescript, label: 'TypeScript' },
  { icon: SiNodedotjs, label: 'Node.js' },
  { icon: SiAmazon, label: 'AWS' },
  { icon: SiPython, label: 'Python' },
  { icon: SiMysql, label: 'SQL / MySQL' },
];

export const ctaButtons = [
  { href: 'https://career.programmers.co.kr/pr/didehtmd_8570', text: '포트폴리오 보기' },
  { href: 'https://github.com/didehtmd', text: 'GitHub 방문', icon: createElement(SiGithub) },
  { href: 'https://helpcenter.wadiz.kr/hc/ko', text: '와디즈 도움말센터', icon: createElement(SiZendesk) },
];
