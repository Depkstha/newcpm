import { BreadcrumbItem, SharedData, User } from "@/types";
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Users',
        href: '/users',
    },
];

const Page = ({ users }: { users: User[] }) => {
    const { auth } = usePage<SharedData>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable columns={columns} data={users} />
            </div>
        </AppLayout>
    )
}

export default Page
