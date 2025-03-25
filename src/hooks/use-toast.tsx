"use client";

import { Toaster, toast } from "sonner";

function useToast() {
    return {
        toast,
        dismiss: (toastId?: string) => {
            // Sonner does not require manual dismiss logic
        },
    };
}

export { useToast, toast, Toaster };
