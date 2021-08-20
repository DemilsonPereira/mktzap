import axios from 'axios';
import {
    Request,
    Response
} from 'express';

class TokenAcess {

    async token(req: Request, res: Response) {
        const response = await axios.get(
            `${process.env.BKP_URL}/${process.env.COMPANY_ID}/token`, {
            params: {
                clientKey: `${process.env.CLEINTKEY}`
            }
        })
        const data = await response.data;

        return res.json(data);
    }
}

export {
    TokenAcess
}
