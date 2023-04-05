import axios from "axios";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";

const ImageListContext = createContext<any>(null);

interface valueType {
    setApproach: (el: boolean) => void;
    // setApproachUrl: (el: string) => void;
}

export const ImageListProvider: FC<PropsWithChildren> = ({ children }) => {
    const [approach, setApproach] = useState<boolean>(false);
    const [imageList, setImageList] = useState<string[] | undefined>();
    const value: valueType = {
        setApproach
    }
    useEffect(() => {
        if(!approach) return;
        (async() => {
            try {
                const response = await axios.get("https://1ecxbe7mfc.execute-api.us-east-1.amazonaws.com/dev/handle");
                console.log(response?.data);
                setApproach(false);
            } catch (error) { console.log(error) }
        })()
    }, [approach])
    return (
        <ImageListContext.Provider value={value}>
            { children }
        </ImageListContext.Provider>
    )
}

export const useImageList = () => useContext(ImageListContext);