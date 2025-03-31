import { LayoutGrid, UserRoundCog } from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { NavGroup } from '@/types';
import { Link } from '@inertiajs/react';
import AppLogo from './app-logo';

const mainNavItems: NavGroup[] = [
    {
        title: 'Setting',
        items: [
            {
                type: 'item',
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutGrid,
            },
            {
                type: 'group',
                title: 'User Management',
                href: '#',
                icon: UserRoundCog,
                items: [
                    {
                        title: 'User',
                        href: '/users',
                    },
                    {
                        title: 'Role',
                        href: '#',
                    },
                    {
                        title: 'Permission',
                        href: '#',
                    },
                ],
            },
        ],
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props} variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {mainNavItems.map((navGroup, index) => (
                    <NavMain key={index} navGroup={navGroup} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
