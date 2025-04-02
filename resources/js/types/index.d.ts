import { Column } from '@tanstack/react-table';
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

type FormType = "sign-in" | "sign-up";

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    type: "item" | "group";
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?:
    {
        title: string,
        href: string,
    }[]
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}
