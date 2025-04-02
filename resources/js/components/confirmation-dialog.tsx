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
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface ConfirmationDialogProps {
    title?: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    triggerText?: string;
    triggerVariant?: 'destructive' | 'outline';
    routeName: string;
    method: 'delete' | 'put' | 'patch';
}

const ConfirmationDialog = ({
    title = 'Are you sure?',
    description = 'This action cannot be undone. This will permanently delete the record.',
    cancelText = 'Cancel',
    confirmText = 'Continue',
}: ConfirmationDialogProps) => {
    const { isDeleteDialogOpen, setIsDeleteDialogOpen, userToDelete } = useUser();

    const { processing, cancel, reset, delete: destroy, clearErrors } = useForm();

    const handleConfirm = (e) => {
        e.preventDefault();
        destroy(route('user.delete', userToDelete?.id!), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsDeleteDialogOpen(false, null);
                toast.success(`User successfully deleted.`, {
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

export default ConfirmationDialog;
