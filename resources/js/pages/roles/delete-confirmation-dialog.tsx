import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useUser } from '@/pages/users/user-context';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface ConfirmationDialogProps {
    title?: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    triggerVariant?: 'destructive';
}

const DeleteConfirmationDialog = ({
    title = 'Are you sure?',
    description = 'This action cannot be undone. This will permanently delete the user.',
    cancelText = 'Cancel',
    confirmText = 'Delete',
}: ConfirmationDialogProps) => {
    const { isDeleteDialogOpen, setIsDeleteDialogOpen, userToDelete } = useUser();
    const { processing, cancel, reset, delete: destroy, clearErrors } = useForm();

    const handleConfirm = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        destroy(route('user.destroy', (userToDelete as User).id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteDialogOpen(false, null);
                toast.success(`User successfully deleted.`, {
                    description: new Date().toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }),
                });
                reset();
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

    const handleCancel = () => {
        setIsDeleteDialogOpen(false, null);
        cancel();
        clearErrors();
    };

    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={() => setIsDeleteDialogOpen(!isDeleteDialogOpen, null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} disabled={processing}>
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteConfirmationDialog;
