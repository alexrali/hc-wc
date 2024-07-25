import { ComponentProps } from "react"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
// import { Mail } from "@/app/products/mail/data"
import { useMail } from "@/app/products/mail/use-mail"


interface Mail {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  date: string;
  read: boolean;
  labels: string[];

  existencia: number;
  ultimo_costo: number;
  costo_promedio: number;
  P3: number;
  estatus: string;
  label: string;
  prioridad: string;
  comprador: string;
}

interface MailListProps {
  items: Mail[]
}

export function MailList({ items }: MailListProps) {
  const [mail, setMail] = useMail()

  return (
    <ScrollArea className="h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col gap-2 p-2 pt-2">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-3 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              mail.selected === item.id && "bg-muted"
            )}
            onClick={() =>
              setMail({
                ...mail,
                selected: item.id,
              })
            }
          >
            {/* <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">

                  <div className="font-bold text-xs ">{item.name}</div>

                  {!item.read && (
                    <span className={`flex h-2 w-2 rounded-full ${getStatusClassName(item.estatus)}`} />
                  )}
                </div> */}
            {/* <div
                  className={cn(
                    "ml-auto text-xs",
                    mail.selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div> */}
            {/* {item.estatus} */}

            {/* </div> */}
            {/* <div className="text-[0.70rem] font-normal text-muted-foreground">{item.subject}</div>
            </div> */}

            <div className="flex items-start gap-2">
              {/* Unread mail indicator */}
              {!item.read && (
                <span className={`flex h-2 w-2 mt-1 rounded-full ${getStatusClassName(item.estatus)}`} />
              )}
              <div className="flex flex-col">
                {/* Item name */}
                
                <div className="font-bold text-xs tracking-tight leading-none mb-1">
                  {item.name} - <span className="text-[0.70rem] font-normal text-muted-foreground">{item.text}</span>
                </div>

                {/* Item subject and existencia badge */}
                <div className="flex items-center gap-2">

                  <div className="flex gap-2">
                    {item.prioridad && (
                      <Badge variant={getBadgeVariantFromPriority(item.prioridad)}>
                        {item.prioridad}
                      </Badge>
                    )}
                  </div>

                  <span className="text-[0.70rem] font-normal text-muted-foreground">{item.subject}</span>
                  {/* Badge for item.existencia */}
                  {/* <Badge variant="outline"> */}
                  <span className="px-1 py-1 text-[0.70rem] font-semibold">{item.existencia} </span>
                  {/* </Badge> */}
                </div>

              </div>


            </div>


            {/* <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {item.costo_promedio}
                  </Badge>
                  <Badge variant="secondary">
                    <span> Existencia:  </span>{item.existencia}
                  </Badge>
                  <Badge>
                    {item.ultimo_costo}
                  </Badge>
                </div> */}



            {/* {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null} */}
          </button>
        ))}
      </div>
    </ScrollArea >
  )
}

function getStatusClassName(status: string): string {
  switch (status) {
    case 'Faltante':
      return 'bg-red-500';
    case 'Programado':
      return 'bg-yellow-500';
    case 'Excedente':
      return 'bg-purple-500'; // Adjust this class as needed, magenta might not be directly available
    case 'Normal':
      return 'bg-green-500';
    case 'Nuevo':
      return 'bg-blue-500';
    default:
      return ''; // Default case if status is unknown
  }
}

function getBadgeVariantFromPriority(
  priority: string
): ComponentProps<typeof Badge>["variant"] {
  if (["ax"].includes(priority.toLowerCase())) {
    return "default"
  }

  if (["ay"].includes(priority.toLowerCase())) {
    return "secondary"
  }

  return "outline"
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default"
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline"
  }

  return "secondary"
}
