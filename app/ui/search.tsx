"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

// Given this is a client side component, we are able to use the 
// react hooks such as use state, usePathname, useRouter, etc.
// when the search component, which is composed in the app/dashboard/invoices/page.tsx 
// is updated with the search params, a re-render of the invoice page table is triggered
// The app/dashboard/invoices/page.tsx is receives a prop called searchParams which is used 
// on the server side. this is passed into the app/ui/invoices/table.tsx component which 
// performs the query to retrieve the data based on the search term
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term?: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1')
    params.delete("query");
    term && params.set("query", term);
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={({ target }) => handleSearch(target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
