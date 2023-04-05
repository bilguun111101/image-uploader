import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";

const ImageListContext = createContext<any>(null);

interface valueType { }

export const ImageListProvider: FC<PropsWithChildren> = ({ children }) => {
    const [approachUrl, setApproachUrl] = useState<string>("");
    const value: valueType = {
        setApproachUrl
    }
    useEffect(() => {
        if(!approachUrl) return;
    }, [approachUrl])
    return (
        <ImageListContext.Provider value={value}>
            { children }
        </ImageListContext.Provider>
    )
}

export const useImageList = () => useContext(ImageListContext);