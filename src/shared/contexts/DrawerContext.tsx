import { createContext, useCallback, useContext, useState } from 'react';


interface IDrawerOptions {
    icon: string;
    label: string;
    path: string;
}

interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOptions[];
    setDrawerOption: (newDrawerOptions: IDrawerOptions[]) => void;
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
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    const setDrawerOption = useCallback((newDrawerOptions: IDrawerOptions[]) => {
        setDrawerOptions(newDrawerOptions);
    }, []);

    return (
        <Drawercontext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOption }} >
            {children}
        </Drawercontext.Provider>
    );

};