import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { taskSchema } from "./data/schema"
import data from './data/tasks.json'

// Simulate a database read for tasks.
function getTasks() {
  // const data = await fs.readFile(
  //   path.join(process.cwd(), "app/(app)/examples/tasks/data/tasks.json")
  // )

  // const tasks = JSON.parse(data.toString())
  // const tasks = JSON.parse(data)
  const tasks = data
  return z.array(taskSchema).parse(tasks)
}

export default function TaskPage() {
  const tasks = getTasks()
  // const tasks = []
  // return(<div>sss</div>)
  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
