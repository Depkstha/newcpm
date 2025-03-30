import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem, type SharedData } from '@/types'
import { Head, Link, usePage } from '@inertiajs/react'
import { User, columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Users',
        href: '/user',
    },
];

const Page = ({ users }: { users: User[] }) => {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-5">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <DataTable columns={columns} data={users} />
                </div>
            </div>
        </AppLayout>
    )
}

export default Page
