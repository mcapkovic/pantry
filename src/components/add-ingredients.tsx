// import {
// 	Drawer,
// 	DrawerClose,
// 	DrawerContent,
// 	DrawerDescription,
// 	DrawerFooter,
// 	DrawerHeader,
// 	DrawerTitle,
// 	DrawerTrigger,
// } from "@/components/ui/drawer"
// import { Button } from "@/components/ui/button"

// export function AddIngredients() {
// 	return (
// 		<Drawer>
// 			<DrawerTrigger>Open</DrawerTrigger>
// 			<DrawerContent>
// 				<DrawerHeader>
// 					<DrawerTitle>Are you absolutely sure?</DrawerTitle>
// 					<DrawerDescription>This action cannot be undone.</DrawerDescription>
// 				</DrawerHeader>
// 				<DrawerFooter>
// 					<Button>Submit</Button>
// 					<DrawerClose>
// 						<Button variant="outline">Cancel</Button>
// 					</DrawerClose>
// 				</DrawerFooter>
// 			</DrawerContent>
// 		</Drawer>

// 	)
// }

import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter
} from "@/components/ui/dialog"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { AddIngredientsForm } from "./add-ingredients-form"

export const AddIngredients = DrawerDialogDemo


export function DrawerDialogDemo() {
	const [open, setOpen] = React.useState(false)
	const isDesktop = useMediaQuery("(min-width: 768px)")

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="outline">add ingredient</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Pridat</DialogTitle>
						{/* <DialogDescription>
							Make changes to your profile here. Click save when you're done.
						</DialogDescription> */}
					</DialogHeader>
					{/* <ProfileForm /> */}
					<AddIngredientsForm closeDialog={() => setOpen(false)} />
					{/* <DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
					</DialogFooter> */}
				</DialogContent>

			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline">Edit Profile</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Edit profile</DrawerTitle>
					<DrawerDescription>
						Make changes to your profile here. Click save when you're done.
					</DrawerDescription>
				</DrawerHeader>
				<ProfileForm className="px-4" />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
	return (
		<form className={cn("grid items-start gap-4", className)}>
			<div className="grid gap-2">
				<Label htmlFor="email">Email</Label>
				<Input type="email" id="email" defaultValue="shadcn@example.com" />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="username">Username</Label>
				<Input id="username" defaultValue="@shadcn" />
			</div>
			<Button type="submit">Save changes</Button>
		</form>
	)
}

