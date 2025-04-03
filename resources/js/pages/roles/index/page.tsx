import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import DeleteConfirmationDialog from '@/pages/users/delete-confirmation-dialog';
import { BreadcrumbItem, Role } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { RoleProvider } from '../role-context';

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

const Page = ({ roles, status }: { roles: Role[]; status: string }) => {
    return (
        <RoleProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Roles" />
                <div className="flex h-full flex-col gap-4 rounded-xl p-4">
                    <DataTable columns={columns} data={roles} />
                    <DeleteConfirmationDialog />
                </div>
            </AppLayout>
        </RoleProvider>
    );
};

export default Page;
