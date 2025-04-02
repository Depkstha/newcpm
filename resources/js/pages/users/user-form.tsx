import { useForm } from '@inertiajs/react';
import { LoaderCircle, Plus } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useUser } from './user-context';

type UserForm = {
    name: string;
    email: string;
    password?: string;
};

interface UserFormProps {
    status?: string;
}

export default function UserForm({ status }: UserFormProps) {
    const { open, selectedUser, setOpen } = useUser();

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm<Required<UserForm>>({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (open && selectedUser) {
            setData({
                name: selectedUser?.name || '',
                email: selectedUser?.email || '',
                password: '',
            });
        } else {
            clearErrors();
            reset();
        }
    }, [open, selectedUser, setData, reset, clearErrors]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const method = selectedUser ? put : post;
        const routeName = selectedUser ? 'user.update' : 'user.store';

        method(route(routeName, selectedUser?.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOpen(false, null);

                toast.success(`User successfully ${selectedUser ? 'updated' : 'created'}.`, {
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
        <Dialog open={open} onOpenChange={() => setOpen(!open, null)}>
            <DialogTrigger asChild>
                <Button>
                    Create
                    <Plus className="ml-2 h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{selectedUser ? 'Edit User' : 'Create User'}</DialogTitle>
                    <DialogDescription>{selectedUser ? 'Update the user details here.' : 'Create a new user here.'}</DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="name"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Full Name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="new-email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Email Address"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required={!selectedUser}
                                tabIndex={2}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="mt-4 flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setOpen(false, null)}>
                                Cancel
                            </Button>
                            <Button type="submit" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                {selectedUser ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </div>
                </form>

                {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
            </DialogContent>
        </Dialog>
    );
}
