import Image from 'next/image';
import { UpdateTeam, DeleteTeam } from '@/app/ui/teams/buttons';
import TeamStatus from '@/app/ui/teams/active';
import { fetchFilteredTeams } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const teams = await fetchFilteredTeams(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {teams?.map((team) => (
              <div
                key={team.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={task.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${task.name}'s profile picture`}
                      /> */}
                      <p>{team.name}</p>
                    </div>
                    {/* <p className="text-sm text-gray-500">{task.email}</p> */}
                  </div>
                  {/* <InvoiceStatus status={task.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {/* {formatCurrency(invoice.amount)} */}
                    </p>
                    {/* <p>{formatDateToLocal(task.date)}</p> */}
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateTeam id={team.id} />
                    <DeleteTeam id={team.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Tasks
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Pending
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Active
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Members
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {teams?.map((team) => (
                <tr
                  key={team.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{team.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{team.total_tasks}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{team.pending_tasks}</p>
                  </td>
                  <td className="flex whitespace-nowrap px-3 py-3 my-2 gap-x-2">
                    <TeamStatus status = {team.active}/>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 ">
                    <p className = "flex max-w-[300px] truncate">{team.members}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateTeam id={team.id} />
                      <DeleteTeam id={team.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
