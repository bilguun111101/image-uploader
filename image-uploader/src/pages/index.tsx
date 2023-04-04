import { Button } from "@/components";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [selectFile, setSelectFile] = useState<File | undefined>(undefined);
    const [windowImage, setWindowImage] = useState("")
    const handleImage = (event: any) => {
        event.preventDefault();
        const { target } = event;
        if(!target.files) return;
        const file = target.files[0];
        setWindowImage(URL.createObjectURL(file));
        setSelectFile(file);
    }
    useEffect(() => {
        (async() => {
            if(!selectFile) return;
            const formData = new FormData()
            formData.append('selectedFile', selectFile);
            try {
                const response = await axios({
                    method: 'put',
                    url: '',
                    data: formData,
                    headers: { "Content-Type": "*" }
                })
            } catch (error) { console.log(error) }
        })()
    }, [selectFile])
    return (
        <section className="w-full h-screen p-3">
            <div className="w-full h-full flex relative items-center justify-center">
                <div className="w-80 h-auto flex flex-col items-center gap-2">
                    <div className="w-full bg-cover bg-no-repeat h-96 border flex justify-center items-center">
                        { windowImage && <img src={windowImage} alt="image" className="w-full h-full" /> }
                    </div>
                    <Button text="upload" handle={handleImage} />
                </div>
            </div>
        </section>
    );
}
 
export default Home;