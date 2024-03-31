import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
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

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]

export const foodCategories = [
  {
    label: "Pecivo",
    value: "PANTRY",
  },
  {
    label: "Ovocie",
    value: "FRUIT",
  },
  {
    label: "Zelenina",
    value: "VEGETABLE",
  },
  {
    label: "Mäso",
    value: "MEAT",
  },
  {
    label: "Mliečne výrobky",
    value: "DAIRY",
  },
  {
    label: "Nápoje",
    value: "DRINK",
  },
  {
    label: "Alkohol",
    value: "ALCOHOL",
  },
  {
    label: "Sladkosti",
    value: "SWEET",
  },
]

export const foodUnits = [
  {
    label: "Kg",
    value: "KG",
  },
  {
    label: "G",
    value: "G",
  },
  {
    label: "L",
    value: "L",
  },
  {
    label: "Ml",
    value: "ML",
  },
  {
    label: "Kus",
    value: "PIECE",
  },
]

export const foodTypes = [
  {
    label: "Potravina",
    value: "FOOD",
  },
  {
    label: "Nápoj",
    value: "DRINK",
  },
  {
    label: "Ingrediencia",
    value: "INGREDIENT",
  },
]

export const foodStorageLocations = [
  {
    label: "Pantry",
    value: "PANTRY",
  },
  {
    label: "Fridge",
    value: "FRIDGE",
  },
  {
    label: "Freezer",
    value: "FREEZER",
  },
  {
    label: "Chladnička",
    value: "REFRIGERATOR",
  },
  {
    label: "Other",
    value: "OTHER",
  },
]