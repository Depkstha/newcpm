import { User } from '@/types';
import { createContext, ReactNode, use, useState, useTransition } from 'react';

type UserContextType = {
    open: boolean;
    isPending: boolean;
    selectedUser: User | null;
    setOpen: (state: boolean | false, user: User | null) => void;
    setSelectedUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
    open: false,
    isPending: false,
    selectedUser: null,
    setOpen: () => {},
    setSelectedUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleOpen = (state: boolean, user: User | null = null) => {
        startTransition(() => {
            setSelectedUser(user);
            setOpen(state);
        });
    };

    return (
        <UserContext.Provider
            value={{
                open,
                isPending,
                selectedUser,
                setOpen: handleOpen,
                setSelectedUser,
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
