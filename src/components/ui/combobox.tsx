// "use client"

// import * as React from "react"
// import { Check, ChevronsUpDown } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// import { Crypto } from "../../types/Crypto";

// export type ComboBoxProps = {
//     labels: Crypto[];
//     labelSelected: (value:string) => void;
// }
// export function Combobox({labels}: ComboBoxProps) {
//   const [open, setOpen] = React.useState(false)
//   const [value, setValue] = React.useState("")

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-[200px] justify-between"
//         >
//           {value
//             ? labels.find((framework) => framework.id === value)?.name
//             : "Select framework..."}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandInput placeholder="Search framework..." />
//           <CommandEmpty>No framework found.</CommandEmpty>
//           <CommandGroup>
//             {labels.map((framework) => (
//               <CommandItem
//                 key={framework?.id}
//                 value={framework?.id}
//                 onSelect={(currentValue) => {
//                   setValue(currentValue === value ? "" : currentValue)
//                   setOpen(false)
//                 }}
//               >
//                 <Check
//                   className={cn(
//                     "mr-2 h-4 w-4",
//                     value === framework?.id ? "opacity-100" : "opacity-0"
//                   )}
//                 />
//                 {framework?.name}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   )
// }

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export type ComboBoxProps = {
  items: { label: string; value: string }[];
  itemSelected: (value: string) => void;
};

export function Combobox(props: ComboBoxProps) {
  const { items: items, itemSelected } = props;

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [search, setSearch] = React.useState('');

  const filteredItems = (
    search.trim() === ''
      ? items
      : items.filter((item) =>
          item.value.toLowerCase().includes(search.toLocaleLowerCase()),
        )
  ).slice(0, 15);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : 'Select a cryptocurrency'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search an item..."
            onValueChange={(value) => setSearch(value)}
          />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            {filteredItems.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  itemSelected(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === item.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
