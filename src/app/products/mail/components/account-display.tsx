// import addDays from "date-fns/addDays"
// import addHours from "date-fns/addHours"

import { addHours, addDays, nextSaturday } from 'date-fns';

// import format from "date-fns/format"
import { format } from 'date-fns';

// import nextSaturday from "date-fns/nextSaturday"
import {
    Archive,
    ArchiveX,
    Clock,
    Forward,
    MoreVertical,
    Reply,
    ReplyAll,
    Trash2,
} from "lucide-react"

import {
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Mail } from "@/app//products/mail/data"

import { ScrollArea } from '@radix-ui/react-scroll-area';
import { CategoryBalance } from './category-balance';
import { CategoryDescriptor } from './category-descriptor';
import { CategoryPerformance } from './category-performance';

interface AccountDisplayProps {
    account: string | null
}

export function AccountDisplay({ account }: AccountDisplayProps) {
    const today = new Date()

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center p-2">
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" >
                                <Archive className="h-4 w-4" />
                                <span className="sr-only">Archive</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Archive</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" >
                                <ArchiveX className="h-4 w-4" />
                                <span className="sr-only">Move to junk</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Move to junk</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Move to trash</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Move to trash</TooltipContent>
                    </Tooltip>
                    <Separator orientation="vertical" className="mx-1 h-6" />
                    <Tooltip>
                        <Popover>
                            <PopoverTrigger asChild>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" >
                                        <Clock className="h-4 w-4" />
                                        <span className="sr-only">Snooze</span>
                                    </Button>
                                </TooltipTrigger>
                            </PopoverTrigger>
                            <PopoverContent className="flex w-[535px] p-0">
                                <div className="flex flex-col gap-2 border-r px-2 py-4">
                                    <div className="px-4 text-sm font-medium">Snooze until</div>
                                    <div className="grid min-w-[250px] gap-1">
                                        <Button
                                            variant="ghost"
                                            className="justify-start font-normal"
                                        >
                                            Later today{" "}
                                            <span className="ml-auto text-muted-foreground">
                                                {format(addHours(today, 4), "E, h:m b")}
                                            </span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="justify-start font-normal"
                                        >
                                            Tomorrow
                                            <span className="ml-auto text-muted-foreground">
                                                {format(addDays(today, 1), "E, h:m b")}
                                            </span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="justify-start font-normal"
                                        >
                                            This weekend
                                            <span className="ml-auto text-muted-foreground">
                                                {format(nextSaturday(today), "E, h:m b")}
                                            </span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="justify-start font-normal"
                                        >
                                            Next week
                                            <span className="ml-auto text-muted-foreground">
                                                {format(addDays(today, 7), "E, h:m b")}
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <Calendar />
                                </div>
                            </PopoverContent>
                        </Popover>
                        <TooltipContent>Snooze</TooltipContent>
                    </Tooltip>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" >
                                <Reply className="h-4 w-4" />
                                <span className="sr-only">Reply</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reply</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" >
                                <ReplyAll className="h-4 w-4" />
                                <span className="sr-only">Reply all</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reply all</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" >
                                <Forward className="h-4 w-4" />
                                <span className="sr-only">Forward</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Forward</TooltipContent>
                    </Tooltip>
                </div>
                <Separator orientation="vertical" className="mx-2 h-6" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">More</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                        <DropdownMenuItem>Star thread</DropdownMenuItem>
                        <DropdownMenuItem>Add label</DropdownMenuItem>
                        <DropdownMenuItem>Mute thread</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Separator />

            <div className="flex flex-1 flex-col">
                <div className="flex items-start p-4">
                    <div className="flex items-start gap-4 text-sm">
                        <div className="grid gap-1">
                        </div>
                    </div>

                </div>
                <Separator />

                <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
                    <ScrollArea className="flex flex-col h-[800px] overflow-auto">
                        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                            <div className="mx-auto grid max-w-[86rem] flex-1 auto-rows-max gap-4">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 lg:gap-8">
                                    {/* First row spanning 2 columns for ProductCardsStats */}
                                    <div className="md:col-span-2 lg:col-span-2">
                                        <CategoryPerformance />
                                    </div>
                                    {/* Second row spanning 2 columns for ProductCardsMetric */}
                                    <div className="md:col-span-2 lg:col-span-2">

                                    </div>
                                    {/* Third row, first column for ProductRecentPurchases */}
                                    <div>
                                        <CategoryBalance />
                                    </div>
                                    {/* Third row, second column for ProductCardsActivityGoal */}
                                    <div>
                                        <CategoryDescriptor />
                                    </div>
                                </div>
                            </div>
                        </main>
                    </ScrollArea>
                </div>


                <Separator className="mt-auto" />
                <div className="p-4">
                    <form>
                        <div className="grid gap-4">
                            <Textarea
                                className="p-4"
                                placeholder={`Reply ${account}...`}
                            />
                            <div className="flex items-center">
                                <Label
                                    htmlFor="mute"
                                    className="flex items-center gap-2 text-xs font-normal"
                                >
                                    <Switch id="mute" aria-label="Mute thread" /> Mute this
                                    thread
                                </Label>
                                <Button
                                    onClick={(e) => e.preventDefault()}
                                    size="sm"
                                    className="ml-auto"
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
