import { FC } from "react";

const div = "p-0 mx-4 my-2.5 rounded-2xl"
const design = [
    "row-[span_26_/_span_26]",
    "row-[span_40_/_span_40]",
    "row-[span_33_/_span_33]",
]

const Gallery: FC = () => {
    return (
        <section className="w-full min-h-screen grid justify-center gap-x-4 grid-cols-[repeat(auto-fill,250px)]">
        </section>
    )
}

export default Gallery;