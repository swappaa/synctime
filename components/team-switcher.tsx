"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle, UserCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTeam } from "@/hooks/use-team";
import { useParams, useRouter } from "next/navigation";

import { useQuery } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamListProps extends PopoverTriggerProps {
  data?: Doc<"teams">[];
}

export default function StoreSwitcher({ className }: TeamListProps) {
  const [open, setOpen] = React.useState(false);

  const storeModal = useTeam();
  const params = useParams();
  const router = useRouter();

  const teams = useQuery(api.teams.getTeams);

  console.log(teams);

  if (!Array.isArray(teams)) {
    return null;
  }

  const formattedItems = teams.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentTeam = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onTeamSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn("w-[200px] justify-between", className)}
        >
          <UserCircle className="mr-2 h-4 w-4" />
          {currentTeam?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No team found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((team) => (
                <CommandItem
                  key={team.value}
                  onSelect={() => onTeamSelect(team)}
                  className="text-sm"
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  {team.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentTeam?.value === team.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Team
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
