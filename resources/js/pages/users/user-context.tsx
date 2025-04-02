import { User } from '@/types';
import { createContext, ReactNode, use, useState, useTransition } from 'react';

type UserContextType = {
    open: boolean;
    isPending: boolean;
    selectedUser: User | null;
    isDeleteDialogOpen: boolean;
    userToDelete: User | null;
    setOpen: (state: boolean | false, user: User | null) => void;
    setSelectedUser: (user: User | null) => void;
    setIsDeleteDialogOpen: (state: boolean | false, user: User | null) => void;
    setUserToDelete: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
    open: false,
    isPending: false,
    selectedUser: null,
    isDeleteDialogOpen: false,
    userToDelete: null,
    setOpen: () => {},
    setSelectedUser: () => {},
    setIsDeleteDialogOpen: () => {},
    setUserToDelete: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const [isPending, startTransition] = useTransition();

    const handleOpen = (state: boolean, user: User | null = null) => {
        startTransition(() => {
            setSelectedUser(user);
            setOpen(state);
        });
    };

    const handleDelete = (state: boolean, user: User | null = null) => {
        startTransition(() => {
            setUserToDelete(user);
            setIsDeleteDialogOpen(state);
        });
    };

    return (
        <UserContext.Provider
            value={{
                open,
                isPending,
                selectedUser,
                isDeleteDialogOpen,
                userToDelete,
                setOpen: handleOpen,
                setSelectedUser,
                setUserToDelete,
                setIsDeleteDialogOpen: handleDelete,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = use(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};
