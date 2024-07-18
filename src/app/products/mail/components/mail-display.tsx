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


import { Bar, BarChart, Label, LabelList, Rectangle, ReferenceLine, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components//ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components//ui/chart"


import { Mail } from "@/app//products/mail/data"
import { ProductCardsStats } from '../../listing/components/product-detail-stats';
import { ProductCardsMetric } from '../../listing/components/product-detail-metric';
import { ProductRecentPurchases } from '../../listing/components/product-detail-recent-purchases';
import { ProductCardsActivityGoal } from '../../listing/components/product-detail-goal';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ProductCardChannelBalance } from '../../listing/components/product-detail-channel-balance';
import { ProductSales } from '../../listing/components/product-detail-sales';
import { ProductCardsStockHistory } from '../../listing/components/product-detail-stock-history';

interface MailDisplayProps {
  mail: Mail | null
}

export function MailDisplay({ mail }: MailDisplayProps) {
  const today = new Date()

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2 ">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Archive className="h-4 w-4" />
                <span className="sr-only">Archive</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <ArchiveX className="h-4 w-4" />
                <span className="sr-only">Move to junk</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to junk</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
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
                  <Button variant="ghost" size="icon" disabled={!mail}>
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
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Reply className="h-4 w-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <ReplyAll className="h-4 w-4" />
                <span className="sr-only">Reply all</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply all</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
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
            <Button variant="ghost" size="icon" disabled={!mail}>
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


      {mail ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={mail.name} />
                <AvatarFallback>
                  {mail.name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{mail.name}</div>
                <div className="line-clamp-1 text-xs">{mail.subject}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span> {mail.email}

                </div>
              </div>
            </div>
            {mail.date && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(mail.date), "PPpp")}
              </div>
            )}
          </div>
          <Separator />

          {/* <div className="whitespace-pre-wrap chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-4 p-4 sm:flex-row sm:p-4"> */}
          {/* {mail.text} */}

          <ScrollArea className="h-[900px] overflow-auto">

            {/* <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-2 lg:gap-2">
                    <div className="md:col-span-2 lg:col-span-2">
                      <ProductCardsStats ean={mail.id} />
                    </div>
                    <div className="md:col-span-2 lg:col-span-2">
                      <ProductCardsMetric ean={mail.id} />
                    </div>
                    <div>
                      <ProductRecentPurchases ean={mail.id} />
                    </div>
                    <div>
                      <ProductCardsActivityGoal ean={mail.id} />
                    </div>
                  </div>
                </div>
              </main> */}

            {/* <main className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
                
                <div className="col-span-8">
                  <ProductCardsStats ean={mail.id} />
                </div>
                
                <div className="col-span-5">
                
                  <ProductSales ean={mail.id} />   
                </div>
                
                <div className="col-span-3">
                  <ProductCardChannelBalance ean={mail.id} />
                </div>
                
                <div className="col-span-6">
                
                  <ProductCardsStockHistory />
                </div>
                
                <div className="col-span-2">
                  <ProductRecentPurchases ean={mail.id} />
                </div>
              </main> */}

            <main className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-6">
              <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[24rem] lg:grid-cols-1 xl:max-w-[32rem]">
                {/* <ProductSales ean={mail.id} />
                <ProductCardsStockHistory /> */}
                <Card className="lg:max-w-md">
                  <CardHeader className="space-y-0 pb-2">
                    <CardDescription>Today</CardDescription>
                    <CardTitle className="text-4xl tabular-nums">
                      12,584{" "}
                      <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                        steps
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        steps: {
                          label: "Steps",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                    >
                      <BarChart
                        accessibilityLayer
                        margin={{
                          left: -4,
                          right: -4,
                        }}
                        data={[
                          {
                            date: "2024-01-01",
                            steps: 2000,
                          },
                          {
                            date: "2024-01-02",
                            steps: 2100,
                          },
                          {
                            date: "2024-01-03",
                            steps: 2200,
                          },
                          {
                            date: "2024-01-04",
                            steps: 1300,
                          },
                          {
                            date: "2024-01-05",
                            steps: 1400,
                          },
                          {
                            date: "2024-01-06",
                            steps: 2500,
                          },
                          {
                            date: "2024-01-07",
                            steps: 1600,
                          },
                        ]}
                      >
                        <Bar
                          dataKey="steps"
                          fill="var(--color-steps)"
                          radius={5}
                          fillOpacity={0.6}
                          activeBar={<Rectangle fillOpacity={0.8} />}
                        />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={4}
                          tickFormatter={(value) => {
                            return new Date(value).toLocaleDateString("en-US", {
                              weekday: "short",
                            })
                          }}
                        />
                        <ChartTooltip
                          defaultIndex={2}
                          content={
                            <ChartTooltipContent
                              hideIndicator
                              labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString("en-US", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })
                              }}
                            />
                          }
                          cursor={false}
                        />
                        <ReferenceLine
                          y={1200}
                          stroke="hsl(var(--muted-foreground))"
                          strokeDasharray="3 3"
                          strokeWidth={1}
                        >
                          <Label
                            position="insideBottomLeft"
                            value="Average Steps"
                            offset={10}
                            fill="hsl(var(--foreground))"
                          />
                          <Label
                            position="insideTopLeft"
                            value="12,343"
                            className="text-lg"
                            fill="hsl(var(--foreground))"
                            offset={10}
                            startOffset={100}
                          />
                        </ReferenceLine>
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-1">
                    <CardDescription>
                      Over the past 7 days, you have walked{" "}
                      <span className="font-medium text-foreground">53,305</span> steps.
                    </CardDescription>
                    <CardDescription>
                      You need <span className="font-medium text-foreground">12,584</span>{" "}
                      more steps to reach your goal.
                    </CardDescription>
                  </CardFooter>
                </Card>
              </div>
              <div className="grid w-full flex-1 gap-6 lg:max-w-[24rem]">

                <Card className="max-w-xs">
                  <CardHeader>
                    <CardTitle>Progress</CardTitle>
                    <CardDescription>
                      average more steps a day this year than last year.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid auto-rows-min gap-2">
                      <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                        12,453
                        <span className="text-sm font-normal text-muted-foreground">
                          steps/day
                        </span>
                      </div>
                      <ChartContainer
                        config={{
                          steps: {
                            label: "Steps",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                        className="aspect-auto h-[32px] w-full"
                      >
                        <BarChart
                          accessibilityLayer
                          layout="vertical"
                          margin={{
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                          }}
                          data={[
                            {
                              date: "2024",
                              steps: 12435,
                            },
                          ]}
                        >
                          <Bar
                            dataKey="steps"
                            fill="var(--color-steps)"
                            radius={4}
                            barSize={32}
                          >
                            <LabelList
                              position="insideLeft"
                              dataKey="date"
                              offset={8}
                              fontSize={12}
                              fill="white"
                            />
                          </Bar>
                          <YAxis dataKey="date" type="category" tickCount={1} hide />
                          <XAxis dataKey="steps" type="number" hide />
                        </BarChart>
                      </ChartContainer>
                    </div>
                    <div className="grid auto-rows-min gap-2">
                      <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                        10,103
                        <span className="text-sm font-normal text-muted-foreground">
                          steps/day
                        </span>
                      </div>
                      <ChartContainer
                        config={{
                          steps: {
                            label: "Steps",
                            color: "hsl(var(--muted))",
                          },
                        }}
                        className="aspect-auto h-[32px] w-full"
                      >
                        <BarChart
                          accessibilityLayer
                          layout="vertical"
                          margin={{
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                          }}
                          data={[
                            {
                              date: "2023",
                              steps: 10103,
                            },
                          ]}
                        >
                          <Bar
                            dataKey="steps"
                            fill="var(--color-steps)"
                            radius={4}
                            barSize={32}
                          >
                            <LabelList
                              position="insideLeft"
                              dataKey="date"
                              offset={8}
                              fontSize={12}
                              fill="hsl(var(--muted-foreground))"
                            />
                          </Bar>
                          <YAxis dataKey="date" type="category" tickCount={1} hide />
                          <XAxis dataKey="steps" type="number" hide />
                        </BarChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* <ProductRecentPurchases ean={mail.id} />
                <ProductCardChannelBalance ean={mail.id} /> */}
              </div>
              <div className="grid w-full flex-1 gap-6">
                <ProductCardChannelBalance ean={mail.id} />
              </div>
            </main>

          </ScrollArea>
          {/* </div> */}


          <Separator className="mt-auto" />

          <div className="p-4">

            {/* <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Reply ${mail.name}...`}
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
            </form> */}

          </div>

        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          Sin selección
        </div>
      )}
    </div>
  )
}
















