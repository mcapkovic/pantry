import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface ResponsiveDialogProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  dialogTrigger?: React.ReactNode;
}

export function ResponsiveDialog({
  children,
  title,
  description,
  dialogTrigger,
}: ResponsiveDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {dialogTrigger ?? <Button variant="outline">Open dialog</Button>}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            {title != null && <DialogTitle>{title}</DialogTitle>}
            {description != null && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {dialogTrigger ?? <Button variant="outline">Open drawer</Button>}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          {title != null && <DrawerTitle>{title}</DrawerTitle>}
          {description != null && (
            <DrawerDescription>{description}</DrawerDescription>
          )}
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// function ProfileForm({ className }: React.ComponentProps<"form">) {
//   return (
//     <form className={cn("grid items-start gap-4", className)}>
//       <div className="grid gap-2">
//         <Label htmlFor="email">Email</Label>
//         <Input type="email" id="email" defaultValue="shadcn@example.com" />
//       </div>
//       <div className="grid gap-2">
//         <Label htmlFor="username">Username</Label>
//         <Input id="username" defaultValue="@shadcn" />
//       </div>
//       <Button type="submit">Save changes</Button>
//     </form>
//   )
// }
