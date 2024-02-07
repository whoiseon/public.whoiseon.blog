'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const Dialog = DialogPrimitive.Dialog;

const DialogTrigger = DialogPrimitive.DialogTrigger;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.DialogOverlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogOverlay>
>(({ className, ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.DialogOverlay
      ref={forwardedRef}
      className={`${className}`}
      {...props}
    />
  </DialogPrimitive.Portal>
));

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogContent>
>(({ className, ...props }, forwardedRef) => (
  <DialogPrimitive.DialogContent
    ref={forwardedRef}
    className={`${className}`}
    {...props}
  />
));
DialogContent.displayName = 'DialogContent';

const DialogTitle = DialogPrimitive.DialogTitle;

const DialogDescription = DialogPrimitive.DialogDescription;

const DialogClose = DialogPrimitive.DialogClose;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
};
