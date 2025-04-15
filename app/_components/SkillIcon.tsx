import { ElementType } from 'react';

interface SkillIconProps {
  icon: ElementType;
  label: string;
}

export default function SkillIcon({ icon: Icon, label }: SkillIconProps) {
  return (
    <div className="flex flex-col items-center">
      <Icon className="text-foreground text-4xl" />
      <span className="text-sm mt-2 text-muted-foreground">{label}</span>
    </div>
  );
}
