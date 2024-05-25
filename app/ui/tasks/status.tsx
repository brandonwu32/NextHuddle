import { CheckIcon, ClockIcon, ExclamationCircleIcon, FolderIcon, TagIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-orange-500 text-white': status === 'archived',
          'bg-green-500 text-white': status === 'completed',
          'bg-yellow-500 text-white': status === 'pending',
          'bg-gray-500 text-white': status === 'todo',
          'bg-red-500 text-white': status === 'backlog',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-5 text-gray-500" />
        </>
      ) : null}
      {status === 'completed' ? (
        <>
          Completed
          <CheckIcon className="ml-1 w-5 text-white" />
        </>
      ) : null}
            {status === 'todo' ? (
        <>
          To-Do
          <TagIcon className="ml-1 w-5 text-white" />
        </>
      ) : null}
            {status === 'archived' ? (
        <>
          Archived
          <FolderIcon className="ml-1 w-5 text-white" />
        </>
      ) : null}
            {status === 'backlog' ? (
        <>
          Backlogged
          <ExclamationCircleIcon className="ml-1 w-5 text-white" />
        </>
      ) : null}
    </span>
  );
}
