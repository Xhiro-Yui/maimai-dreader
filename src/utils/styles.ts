import { cva, type VariantProps } from "class-variance-authority";

export const card = cva(
    "rounded-xl shadow-md border bg-[var(--color-bg)] text-[var(--color-text)] border-[var(--color-header)]",
    {
        variants: {
            size: {
                default: "p-4",
                lg: "max-w-3xl w-full backdrop-blur-md p-8",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

export type CardVariants = VariantProps<typeof card>;

export const badge = cva(
    "px-2 py-1 rounded text-white text-xs",
    {
        variants: {
            level: {
                basic: "bg-[var(--color-basic-row)]",
                advanced: "bg-[var(--color-advanced-row)]",
                expert: "bg-[var(--color-expert-row)]",
                master: "bg-[var(--color-master-row)]",
            },
        },
        defaultVariants: {
            level: "basic",
        },
    }
);

export type BadgeVariants = VariantProps<typeof badge>;
