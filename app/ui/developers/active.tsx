import clsx from 'clsx';

export default function TeamStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-green-500 text-white': status === '1',
          'bg-red-500 text-white': status === '0',
        },
      )}
    >
      {status === '1' ? (
        <>
          Active
        </>
      ) : null}
      {status === '0' ? (
        <>
          Inactive
        </>
      ) : null}
    </span>
  );
}
