import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
        <Toaster
            closeButton
            richColors
            position="bottom-right"
            duration={4000}
            visibleToasts={3}
            toastOptions={{
                style: {
                    fontFamily: 'inherit',
                },
            }}
        />
    </AppLayoutTemplate>
);
