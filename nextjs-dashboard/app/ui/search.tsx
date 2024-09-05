'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) 
{
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // This function used to be a normal function called handleSearch,
  // but was changed in chapter 11 of the course when we added search funcionality.
  // We changed it to add debouncing (reducing the frequency of function calls).
  // In this case, you can see a 300 at the end of the function (the second parameter
  // to the useDebouncedCallback() function). This means the function will not be
  // called after every keystroke from the user as before, but instead only if
  // 300ms have elapsed since the most recent keystroke.
  const handleSearch = useDebouncedCallback((term) =>
  {
    console.log(`Searching for '${term}'...`);

    // This code modifies the parameters that are in the page URL.
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term)
    {
      params.set('query', term);
    }
    else
    {
      params.delete('query');
    }
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
        onChange={(e) =>
        {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
