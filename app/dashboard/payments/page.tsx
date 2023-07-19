import { Role } from "@/components/Roles";
import { SectionHeading } from "@/components/dashboard/SectionHeading";
import { SectionWrapper } from "@/components/dashboard/SectionWrapper";
import { cn } from "@/lib/helpers";
import { BanknotesIcon } from "@heroicons/react/20/solid";

const transactions = [
  {
    id: 1,
    name: "Payment from company ABC",
    href: "#",
    amount: "$20,000",
    currency: "AUD",
    status: "success",
    date: "July 12, 2021",
    datetime: "2020-07-11",
  },
  {
    id: 2,
    name: "Payment from company DEF",
    href: "#",
    amount: "$20,000",
    currency: "AUD",
    status: "success",
    date: "July 11, 2021",
    datetime: "2020-07-11",
  },
];

const statusStyles: any = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

export default function PaymentsPage() {
  return (
    <SectionWrapper>
      <SectionHeading title="Payments" />
      <section className="py-8">
        <Payments />
        <Payments />
      </section>
    </SectionWrapper>
  );
}

function Payments() {
  return (
    <Role role="worker">
      <div className="pb-6">
        <h2 className="heading-3 pl-4">Week 32</h2>
        {/* Activity list (smallest breakpoint only) */}
        <div className="rounded-lg shadow sm:hidden">
          <ul
            role="list"
            className="mt-2 divide-y divide-gray-200 overflow-hidden rounded-lg shadow sm:hidden"
          >
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <a
                  href={transaction.href}
                  className="block bg-white px-4 py-4 hover:bg-gray-50"
                >
                  <span className="flex items-center space-x-4">
                    <span className="flex flex-1 space-x-2 truncate">
                      <BanknotesIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="flex flex-col truncate text-sm text-gray-500">
                        <span className="truncate">{transaction.name}</span>
                        <span>
                          <span className="font-medium text-gray-900">
                            {transaction.amount}
                          </span>{" "}
                          {transaction.currency}
                        </span>
                        <time dateTime={transaction.datetime}>
                          {transaction.date}
                        </time>
                      </span>
                    </span>
                    <span
                      className={cn(
                        statusStyles[transaction.status],
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                      )}
                    >
                      {transaction.status}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Activity table (small breakpoint and up) */}
        <div className="hidden sm:block">
          <div className="mt-2 flex flex-col">
            <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      Transaction
                    </th>
                    <th
                      className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      Amount
                    </th>
                    <th
                      className="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                      scope="col"
                    >
                      Status
                    </th>
                    <th
                      className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="bg-white">
                      <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        <div className="flex">
                          <a
                            href={transaction.href}
                            className="group inline-flex space-x-2 truncate text-sm"
                          >
                            <BanknotesIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <p className="truncate text-gray-500 group-hover:text-gray-900">
                              {transaction.name}
                            </p>
                          </a>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <span className="font-medium text-gray-900">
                          {transaction.amount}
                        </span>
                        {transaction.currency}
                      </td>
                      <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                        <span
                          className={cn(
                            statusStyles[transaction.status],
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                          )}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <time dateTime={transaction.datetime}>
                          {transaction.date}
                        </time>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Role>
  );
}
