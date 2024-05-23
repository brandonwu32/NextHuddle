import { HeartIcon } from '@heroicons/react/24/outline';
import { inter } from '@/app/ui/fonts';

export default function CodebaseLogo() {
  return (
    <div
      className={`${inter.className} flex flex-row items-center leading-none text-white`}
    >
      <HeartIcon className="h-12 w-12 rotate-[-15deg] mr-[10px]" />
      <p className="text-[44px]"> Codebase</p>
    </div>
  );
}
