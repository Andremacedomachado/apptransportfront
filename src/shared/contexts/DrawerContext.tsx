import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
}

interface IDrawerProviderProps {
    children: React.ReactNode
}

const Drawercontext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(Drawercontext);
};

// eslint-disable-next-line react/prop-types
export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    return (
        <Drawercontext.Provider value={{ isDrawerOpen: isDrawerOpen, toggleDrawerOpen: toggleDrawer }} >
            {children}
        </Drawercontext.Provider>
    );

};