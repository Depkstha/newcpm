import { DataTableColumnHeaderSimple } from '@/components/data-table-column-header-simple-sort';
import { DataTableColumnHeader } from '@/components/data-table-column-header-sort';
import { Checkbox } from '@/components/ui/checkbox';
import { Role } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import RowActions from './row-actions';

export const columns: ColumnDef<Role>[] = [
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
        accessorKey: 'guard_name',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Guard" />;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const role = row.original;
            return <RowActions role={role} />;
        },
    },
];
