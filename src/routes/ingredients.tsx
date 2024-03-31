import { createFileRoute, redirect } from '@tanstack/react-router'
import TaskPage from '@/components/tasks/page'
import { columns } from "@/components/ingredients-table/components/columns"
import { DataTable } from '@/components/ingredients-table/components/data-table'
import { z } from 'zod'
import {taskSchema} from '@/components/ingredients-table/data/schema'
import ingredients from '@/components/ingredients-table/data/ingredients.json'

export const Route = createFileRoute('/ingredients')({
    beforeLoad: ({ context, location }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            })
        }
    },
    component: IngredientsPage,
})


function getTasks() {
    return z.array(taskSchema).parse(ingredients)
  }

function IngredientsPage() {
    const tasks = getTasks()
    return <>
    <div className='m-6'> <DataTable data={tasks} columns={columns} /></div>
   
    <TaskPage />
    </>
}
