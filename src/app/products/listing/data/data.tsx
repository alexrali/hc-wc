import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
  StarFilledIcon,
  RocketIcon
} from "@radix-ui/react-icons"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const compradores = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
]

export const statuses = [
  {
    value: "Faltante",
    label: "Faltante",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Programado",
    label: "Programado",
    icon: CircleIcon,
  },
  {
    value: "Excedente",
    label: "Excedente",
    icon: StopwatchIcon,
  },
  {
    value: "Normal",
    label: "Normal",
    icon: CheckCircledIcon,
  },
  {
    value: "Nuevo",
    label: "Nuevo",
    icon: CheckCircledIcon,
  },
  // {
  //   value: "canceled",
  //   label: "Canceled",
  //   icon: CrossCircledIcon,
  // },
]

export const priorities = [
  // {
  //   label: "Low",
  //   value: "low",
  //   icon: ArrowDownIcon,
  // },
  // {
  //   label: "Medium",
  //   value: "medium",
  //   icon: ArrowRightIcon,
  // },
  // {
  //   label: "High",
  //   value: "high",
  //   icon: ArrowUpIcon,
  // },

  {
    label: "AX", 
    value: "AX", 
    icon: RocketIcon
  }, 
  {
    label: "AY", 
    value: "AY", 
    icon: ArrowRightIcon
  }, 
  {
    label: "AZ", 
    value: "AZ", 
    icon: ArrowDownIcon
  },
  {
    label: "BX", 
    value: "BX", 
    icon: ArrowUpIcon
  }, 
  {
    label: "BY", 
    value: "BY", 
    icon: ArrowRightIcon
  }, 
  {
    label: "BZ", 
    value: "BZ", 
    icon: ArrowDownIcon
  },
  {
    label: "CX", 
    value: "CX", 
    icon: ArrowUpIcon
  }, 
  {
    label: "CY", 
    value: "CY", 
    icon: ArrowRightIcon
  }, 
  {
    label: "CZ", 
    value: "CZ", 
    icon: ArrowDownIcon
  },
  {
    label: "Sin datos", 
    value: "NA", 
    icon: ArrowDownIcon
  },

]



// label=["bug","feature","documentation"]


// status=["backlog","todo","in progress","done","canceled"]


// priority=["low","medium","high"]

