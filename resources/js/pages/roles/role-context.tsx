import { Role } from '@/types';
import { createContext, ReactNode, use, useState, useTransition } from 'react';

type RoleContextType = {
    isPending: boolean;
    isDeleteDialogOpen: boolean;
    roleToDelete: Role | null;
    setIsDeleteDialogOpen: (stateone: boolean | false, role: Role | null) => void;
    setRoleToDelete: (role: Role | null) => void;
};

const RoleContext = createContext<RoleContextType>({
    isPending: false,
    isDeleteDialogOpen: false,
    roleToDelete: null,
    setIsDeleteDialogOpen: () => {},
    setRoleToDelete: () => {},
});

export const RoleProvider = ({ children }: { children: ReactNode }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleDelete = (stateone: boolean, role: Role | null = null) => {
        startTransition(() => {
            setRoleToDelete(role);
            setIsDeleteDialogOpen(stateone);
        });
    };

    return (
        <RoleContext.Provider
            value={{
                isPending,
                isDeleteDialogOpen,
                roleToDelete,
                setRoleToDelete,
                setIsDeleteDialogOpen: handleDelete,
            }}
        >
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => {
    const context = use(RoleContext);
    if (!context) throw new Error('useRole must be used within a RoleProvider');
    return context;
};
