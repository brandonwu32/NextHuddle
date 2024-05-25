import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { inter } from '@/app/ui/fonts';
import { fetchImportantLinks } from '@/app/lib/data';
export default async function ImportantLinks() {
  const importantLinks = await fetchImportantLinks();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
        Important Links
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {importantLinks.map((link, i) => {
            return (
              <div
                key={link.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex content-end w-full justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                       {link.name}
                      </p>
                  </div>
                  <div className="max-w-[300px]">
                    <p className="truncate text-sm font-semibold md:text-base">
                      <a href = {link.url} target="_blank">{link.url}</a>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
