import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import DeleteConfirmationDialog from '@/pages/users/delete-confirmation-dialog';
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

const Page = ({ users, status }: { users: User[]; status: string }) => {
    return (
        <UserProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Users" />
                <div className="flex h-full flex-col gap-4 rounded-xl p-4">
                    <div className="flex justify-end">
                        <UserForm status={status} />
                    </div>

                    <DataTable columns={columns} data={users} />
                    <DeleteConfirmationDialog />
                </div>
            </AppLayout>
        </UserProvider>
    );
};

export default Page;
