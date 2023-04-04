import { NextApiHandler } from "next";
import formidable from "formidable";

export const config = {
    api: {
        bodyParser: false,
    }
}

const handler: NextApiHandler = (req, res) => {
}

export default handler;