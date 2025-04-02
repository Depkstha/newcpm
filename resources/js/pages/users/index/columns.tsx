import { DataTableColumnHeaderSimple } from '@/components/data-table-column-header-simple-sort';
import { DataTableColumnHeader } from '@/components/data-table-column-header-sort';
import { Checkbox } from '@/components/ui/checkbox';
import { User } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import RowActions from './row-actions';

export const columns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeaderSimple column={column} title="Name" />,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Email" />;
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const user = row.original;
            return <RowActions user={user} />;
        },
    },
];
