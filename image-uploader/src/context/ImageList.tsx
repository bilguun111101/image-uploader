import { createContext, FC, PropsWithChildren, useContext } from "react";

const ImageListContext = createContext<any>(null);

interface valueType { }

export const ImageListProvider: FC<PropsWithChildren> = ({ children }) => {
    const value: valueType = {}
    return (
        <ImageListContext.Provider value={value}>
            { children }
        </ImageListContext.Provider>
    )
}

export const useImageList = () => useContext(ImageListContext);