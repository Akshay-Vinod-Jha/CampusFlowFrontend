import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

/**
 * Professional Dialog Component using Radix UI
 * Accessible, keyboard-friendly, with backdrop
 */

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = ({ className = "", ...props }) => (
  <DialogPrimitive.Overlay
    className={`dialog-overlay fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in ${className}`}
    {...props}
  />
);

const DialogContent = ({
  children,
  className = "",
  showClose = true,
  ...props
}) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={`dialog-content fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-soft-xl w-full max-w-md p-6 animate-scale-in ${className}`}
      {...props}
    >
      {children}
      {showClose && (
        <DialogPrimitive.Close className="absolute right-4 top-4 p-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors">
          <X className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
);

const DialogHeader = ({ children, className = "", ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const DialogTitle = ({ children, className = "", ...props }) => (
  <DialogPrimitive.Title
    className={`text-xl font-semibold text-neutral-900 ${className}`}
    {...props}
  >
    {children}
  </DialogPrimitive.Title>
);

const DialogDescription = ({ children, className = "", ...props }) => (
  <DialogPrimitive.Description
    className={`text-sm text-neutral-600 mt-2 ${className}`}
    {...props}
  >
    {children}
  </DialogPrimitive.Description>
);

const DialogFooter = ({ children, className = "", ...props }) => (
  <div
    className={`mt-6 flex items-center justify-end gap-3 ${className}`}
    {...props}
  >
    {children}
  </div>
);

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Footer = DialogFooter;
Dialog.Close = DialogClose;

export default Dialog;
