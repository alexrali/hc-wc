"use client"

import * as React from "react"
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"

import { AccountSwitcher } from "@/app//products/mail/components/account-switcher"
import { MailDisplay } from "@/app//products/mail/components/mail-display"
import { MailList } from "@/app//products/mail/components/mail-list"
import { Nav } from "@/app//products/mail/components/nav"
import { type Mail } from "@/app/products/mail/data"
import { useMail } from "@/app//products/mail/use-mail"
import { PanelOnCollapse } from "react-resizable-panels"
import { ScrollArea } from "@radix-ui/react-scroll-area"

import getProviderCategories from "@/app/actions/getProviderCategories"
import { ProviderCategory } from "@/app/models/ProviderCategory"
import getProviderProducts from "@/app/actions/getProviderProducts";
import { set } from "lodash"
import { AccountDisplay } from "./account-display"


interface MailProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  mails: Mail[]
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export function Mail({
  accounts,
  //mails,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const [selectedAccount, setSelectedAccount] = React.useState("email@example.com");

  const [mail] = useMail()

  const [categories, setCategories] = React.useState<ProviderCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string | null>(null);

  const [mails, setMails] = React.useState<Mail[]>([]);


  // Assuming setCategoryId is the setter function from useState for selectedCategoryId
  React.useEffect(() => {
    // Reset selectedCategoryId to null whenever selectedAccount changes
    setSelectedCategoryId(null);
  }, [selectedAccount]); // Dependency array includes only selectedAccount to trigger on its change

  React.useEffect(() => {
    const fetchData = async () => {
      if (selectedCategoryId === null) {
        console.log(selectedAccount);
        const categoriesResponse = await getProviderCategories(selectedAccount);
        if (categoriesResponse.type === 'GET_PROVIDER_CATEGORIES_SUCCESS') {
          setCategories(categoriesResponse.payload as ProviderCategory[]);
        } else {
          console.error('Failed to fetch provider categories:', categoriesResponse.payload);
        }
      }

      if (selectedCategoryId !== null) {
        console.log(selectedCategoryId, selectedAccount);
        const productsResponse = await getProviderProducts(selectedAccount, selectedCategoryId);
        if (productsResponse.type === 'GET_PROVIDER_PRODUCTS_SUCCESS' && Array.isArray(productsResponse.payload)) {
          const mappedMails = productsResponse.payload.map((product) => ({
            id: product.clave,
            name: product.descripcion,
            email: product.estatus,
            subject: product.clave,
            text: product.presentacion,
            date: new Date().toISOString(),
            read: false,
            labels: [],
          }));
          setMails(mappedMails);
        } else {
          console.error('Failed to fetch provider products:', productsResponse.payload);
        }
      } else {
        console.log('Selected category is null, fetching with empty category ID', selectedAccount);
        const productsResponse = await getProviderProducts(selectedAccount, '');
        if (productsResponse.type === 'GET_PROVIDER_PRODUCTS_SUCCESS' && Array.isArray(productsResponse.payload)) {
          const mappedMails = productsResponse.payload.map((product) => ({
            id: product.clave,
            name: product.descripcion,
            email: product.estatus,
            subject: product.clave,
            text: product.presentacion,
            date: new Date().toISOString(),
            read: false,
            labels: [],
          }));
          setMails(mappedMails);
        } else {
          console.error('Failed to fetch provider products with empty category:', productsResponse.payload);
        }
      }
    };

    fetchData();
  }, [selectedAccount, selectedCategoryId]);

  const handleCategorySelect = (categoryId: string) => {
    mail.selected = null;
    console.log(categoryId);
    // Toggle selection: if the selected category is clicked again, unselect it.
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(categoryId);
    }
  };

  // console.log("selectedCategoryId:", selectedCategoryId);
  // console.log("mail.selected:", mail.selected);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={((collapsed: boolean, panelId: string) => {
            setIsCollapsed(collapsed);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              collapsed
            )};panelId=${panelId}`;
          }) as unknown as PanelOnCollapse}
          className={cn(
            isCollapsed &&
            "min-w-[40px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <AccountSwitcher
              isCollapsed={isCollapsed}
              accounts={accounts}
              selectedAccount={selectedAccount}
              setSelectedAccount={setSelectedAccount}
            />
          </div>
          <Separator />
          <ScrollArea className="flex flex-col h-[550px] overflow-auto">
            {/* 
            <div>
              <span>
                {selectedAccount}
                {selectedCategoryId}
              </span>
            </div> */}

            {/* <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Inbox",
                  label: "128",
                  icon: Inbox,
                  variant: "default",
                },
                {
                  title: "Drafts",
                  label: "9",
                  icon: File,
                  variant: "ghost",
                },
                {
                  title: "Sent",
                  label: "",
                  icon: Send,
                  variant: "ghost",
                },
                {
                  title: "Junk",
                  label: "23",
                  icon: ArchiveX,
                  variant: "ghost",
                },
                {
                  title: "Trash",
                  label: "",
                  icon: Trash2,
                  variant: "ghost",
                },
                {
                  title: "Archive",
                  label: "",
                  icon: Archive,
                  variant: "ghost",
                },
              ]}
            /> */}

            <Nav
              isCollapsed={isCollapsed}
              links={categories.map((category) => ({
                title: ((title: string) => title.length >= 20 ? `${title.slice(0, 20)}...` : title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))(category.title),
                label: category.label.toString(),
                icon: Inbox,
                variant: category.code === selectedCategoryId ? "default" : "ghost",
                onClick: () => handleCategorySelect(category.code),
              }))}
            />

          </ScrollArea>

          <Separator />
          {/* <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Social",
                label: "972",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: "Updates",
                label: "342",
                icon: AlertCircle,
                variant: "ghost",
              },
              {
                title: "Forums",
                label: "128",
                icon: MessagesSquare,
                variant: "ghost",
              },
              {
                title: "Shopping",
                label: "8",
                icon: ShoppingCart,
                variant: "ghost",
              },
              {
                title: "Promotions",
                label: "21",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          /> */}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>


          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar" className="pl-8" />
              </div>
            </form>
          </div>

          <Separator />

          <MailList items={mails} />

          {/* <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                 
                  Todos
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                 
                  Faltantes
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MailList items={mails} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs> */}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>


          {mail.selected ? (
            <MailDisplay mail={mails.find((item) => item.id === mail.selected) || null} />
          ) : selectedCategoryId ? (
            <AccountDisplay account={selectedCategoryId} />
          ) : (
            <div>Please select a mail or an account.</div>
          )}

        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}