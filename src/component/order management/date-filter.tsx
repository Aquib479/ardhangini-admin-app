// import React from "react";
// import { Button } from "../ui/button";
// import { cn } from "../../lib/utils";
// import { format } from "date-fns";
// import { PopoverContent } from "@radix-ui/react-popover";
// import { Calendar } from "../ui/calendar";
// import { CalendarIcon } from "lucide-react";
// import { Popover, PopoverTrigger } from "../ui/popover";

// const DateFilter = () => {
//   const [date, setDate] = React.useState<Date>();

//   return (
//     <>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant={"outline"}
//             className={cn(
//               "w-[280px] justify-start text-left font-normal rounded-md",
//               !date && "text-muted-foreground"
//             )}
//           >
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {date ? format(date, "PPP") : <span>Pick a date</span>}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0 z-50">
//           <Calendar
//             mode="single"
//             selected={date}
//             onSelect={setDate}
//             initialFocus
//             className="bg-white rounded-md border shadow"
//           />
//         </PopoverContent>
//       </Popover>
//     </>
//   );
// };

// export default DateFilter;

import * as React from "react";
import { addDays, format } from "date-fns";
import { ArrowDownUp, Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface DateProps {
  filterDate: DateRange | undefined;
  setFilterDate: (date: DateRange | undefined) => void;
}

export default function DateFilter({ filterDate, setFilterDate }: DateProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <>
      <div className={cn("grid gap-2")}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button variant="outline">
        <ArrowDownUp size={18} />
      </Button>
    </>
  );
}
