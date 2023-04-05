import { Button } from "@/components";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [approachUrl, setApproachUrl] = useState<string | undefined>(undefined);
    const [selectFile, setSelectFile] = useState<File | undefined>(undefined);
    const [windowImage, setWindowImage] = useState("")

    const sendFile = useCallback(async() => {
        if(!selectFile) return;
            const Key = selectFile?.name;
            const Type = Key?.split('.').at(-1);
            try {
                const response = await axios({
                    method: 'POST',
                    url: 'https://jwyaocojv2.execute-api.us-east-1.amazonaws.com/dev/url',
                    data: {
                        Key,
                        Type
                    },
                    headers: {
                        "Content-Type": "*",
                    }
                })
                setApproachUrl(response?.data.uploadUrl);
            } catch (error) { console.log(error) }
    }, [selectFile])

    const handleImage = (event: any) => {
        event.preventDefault();
        const { target } = event;
        if(!target.files) return;
        const file = target.files[0];
        setWindowImage(URL.createObjectURL(file));
        setSelectFile(file);
    }

    useEffect(() => {
        if(!approachUrl || !selectFile) return;
        (async() => {
            const formData = new FormData();
            formData.append('selectedFile', selectFile);
            try {
                const response = await axios({
                    method: 'PUT',
                    url: approachUrl,
                    data: formData,
                    headers: { "Content-Type": "*" }
                })
                if(!response) return;
                setSelectFile(undefined);
                setApproachUrl(undefined);
            } catch (error) { console.log(error) }
        })()
    }, [approachUrl])
    return (
        <section className="w-full h-screen p-3">
            <div className="w-full h-full flex relative items-center justify-center">
                <div className="w-80 h-auto flex flex-col items-center gap-2">
                    <div className="w-full bg-cover bg-no-repeat h-96 border flex justify-center items-center">
                        { windowImage && <img src={windowImage} alt="image" className="w-full h-full" /> }
                    </div>
                    <div className="flex gap-4">
                        <Button text="upload" handle={handleImage} type="file" />
                        <Button text="send" handle={sendFile} type="submit" />
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Home;