import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { inter } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';


const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const cardData = await fetchCardData();
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}
      {<Card title="All" value={cardData.numberOfTasks} type="collected" />}
        {<Card title="Completed" value={cardData.numberOfCompletedTasks} type="pending" />}
        {<Card title="Pending" value={cardData.numberOfPendingTasks} type="invoices" />}
        {<Card title="Backlogged" value={cardData.numberOfBacklogTasks} type="customers" />}
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${inter.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
