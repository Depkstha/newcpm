import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head } from '@inertiajs/react';
import { UserProvider } from '../user-context';
import UserForm from '../user-form';
import { columns } from './columns';

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
    return (
        <UserProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Users" />
                <div className="flex h-full flex-col gap-4 rounded-xl p-4">
                    <div className="flex justify-end">
                        <UserForm />
                    </div>
                    <DataTable columns={columns} data={users} />
                </div>
            </AppLayout>
        </UserProvider>
    );
};

export default Page;
