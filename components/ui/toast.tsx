"use client"

import * as React from "react"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import {
  Toast,
  ToastProvider,
  ToastViewport as RadixToastViewport,
  ToastIcon as RadixToastIcon,
  ToastClose as RadixToastClose,
  ToastTitle as RadixToastTitle,
  ToastDescription as RadixToastDescription,
} from "@radix-ui/react-toast"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const TOAST_LIMIT = 1
const TOAST_VIEWPORT_PADDING = "32px"

type ToasterProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastViewportProps = React.ComponentPropsWithoutRef<typeof RadixToastViewport>

const ToastViewport = React.forwardRef<React.ElementRef<typeof RadixToastViewport>, ToastViewportProps>(
  ({ className, ...props }, ref) => (
    <RadixToastViewport
      ref={ref}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className,
      )}
      {...props}
    />
  ),
)
ToastViewport.displayName = RadixToastViewport.displayName

type ToastIconProps = React.ComponentPropsWithoutRef<typeof RadixToastIcon>

const ToastIcon = React.forwardRef<React.ElementRef<typeof RadixToastIcon>, ToastIconProps>(
  ({ className, ...props }, ref) => <RadixToastIcon ref={ref} className={cn("h-4 w-4", className)} {...props} />,
)
ToastIcon.displayName = RadixToastIcon.displayName

type ToastCloseProps = React.ComponentPropsWithoutRef<typeof RadixToastClose>

const ToastClose = React.forwardRef<React.ElementRef<typeof RadixToastClose>, ToastCloseProps>(
  ({ className, ...props }, ref) => (
    <RadixToastClose
      ref={ref}
      className={cn(
        "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
        className,
      )}
      toast-close=""
      {...props}
    >
      <X className="h-4 w-4" />
    </RadixToastClose>
  ),
)
ToastClose.displayName = RadixToastClose.displayName

type ToastTitleProps = React.ComponentPropsWithoutRef<typeof RadixToastTitle>

const ToastTitle = React.forwardRef<React.ElementRef<typeof RadixToastTitle>, ToastTitleProps>(
  ({ className, ...props }, ref) => (
    <RadixToastTitle ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
  ),
)
ToastTitle.displayName = RadixToastTitle.displayName

type ToastDescriptionProps = React.ComponentPropsWithoutRef<typeof RadixToastDescription>

const ToastDescription = React.forwardRef<React.ElementRef<typeof RadixToastDescription>, ToastDescriptionProps>(
  ({ className, ...props }, ref) => (
    <RadixToastDescription ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
  ),
)
ToastDescription.displayName = RadixToastDescription.displayName

type ToastPropsWithVariants = ToastProps & {
  variant?: "default" | "destructive"
}

const ToastComponent = React.forwardRef<React.ElementRef<typeof Toast>, ToastPropsWithVariants>(
  ({ className, variant, ...props }, ref) => {
    return (
      <Toast
        ref={ref}
        className={cn(
          "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
          variant === "destructive" && "destructive group",
          className,
        )}
        {...props}
      />
    )
  },
)
ToastComponent.displayName = Toast.displayName

export {
  ToastComponent as Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  useToast,
}
