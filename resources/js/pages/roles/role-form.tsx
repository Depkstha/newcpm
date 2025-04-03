import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, FormType, Permission, Role, SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';

type RoleForm = {
    name: string;
    guard_name: string;
    permissions: [];
};

interface RoleFormProps {
    role?: Role | null;
    title: string;
    type: FormType;
    status?: string;
    permissionLists: {} | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'User',
        href: '/user',
    },
    {
        title: 'Create',
        href: '/user/create',
    },
];

export default function RoleForm({ role, title, type, status, permissionLists }: RoleFormProps) {
    const isEditing = !!role;
    const [allPermssionsChecked, setAllPermssionsChecked] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState<Record<number, boolean>>({})
    const [parentSwitches, setParentSwitches] = useState<Record<string, boolean>>({});
    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, put, processing, errors, reset, clearErrors, recentlySuccessful } = useForm<Required<RoleForm>>({
        name: '',
        guard_name: 'web',
        permissions: [],
    });

    useEffect(() => {
        const initialPermissions: Record<string, boolean> = {}
        const initialParentSwitches: Record<string, boolean> = {}

        Object.entries(permissionLists).forEach(([key, permissions]) => {
          initialParentSwitches[key] = false
          permissions.forEach((permission) => {
            const permissionId = `${key}_${permission}`
            initialPermissions[permissionId] = false
          })
        })

        setSelectedPermissions(initialPermissions)
        setParentSwitches(initialParentSwitches)
      }, [permissionLists])

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const routeName = isEditing ? 'role.update' : 'role.store';

        method(route(routeName, role?.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success(`Role successfully ${isEditing ? 'updated' : 'created'}.`, {
                    description: new Date().toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }),
                });
            },
            onError: (error) => {
                toast.error('Failed to perform!', {
                    description: new Date().toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }),
                });
                console.log(error);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role create" />
            <div className="flex h-full flex-col gap-4 rounded-xl p-4">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Role Name"
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div>
                            <Label htmlFor="guard_name">Guard Name</Label>
                            <Input
                                id="guard_name"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.guard_name}
                                onChange={(e) => setData('guard_name', e.target.value)}
                                required
                                autoComplete="guard_name"
                                placeholder="web"
                            />

                            <InputError className="mt-2" message={errors.guard_name} />
                        </div>

                        <div>
                            <div className="flex flex-col justify-end">
                                <div className="mb-2 flex items-center space-x-2">
                                    <Switch id="all-check" />
                                    <Label htmlFor="all-check">Select All</Label>
                                </div>
                                <p className="text-muted-foreground text-sm">Enable all permissions for this role</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-end">
                                <div className="space-x-2">
                                    <Button type="submit" className="bg-primary">
                                        Assign Role
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>{isEditing ? 'Update' : 'Create'}</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">{isEditing ? 'Updated' : 'Created'}</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
