import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import cblogo from '@/public/static/cblogo.png';
import Image from 'next/image';
import CodebaseLogo from '@/app/ui/cb-logo';


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h- 20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        { <CodebaseLogo />}
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        <Image src={cblogo} alt='none' width={50}/>
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Huddle.</strong> This is the task management tool for{' '}
            <a href="https://codebase.studentorg.berkeley.edu/" target='_blank'className="text-blue-500">
              Codebase
            </a>
             {'\n'} Mentored Fall{"'"}2024
            , brought to you by Branya.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {<Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />}
        </div>
      </div>
    </main>
  );
}
