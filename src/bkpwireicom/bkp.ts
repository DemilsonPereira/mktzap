import axios from 'axios';
import {
    Request,
    Response
} from 'express';

class HistoryMensages {

    async serviceHistory(req: Request, res: Response) {
        for (var page = 1; page <= 469; page++) {
            try {
                const response = await axios.get(
                    `${process.env.BKP_URL}/${process.env.COMPANY_ID}/history`, {
                    headers: {
                        Authorization: `Bearer ${process.env.TOKEN}`,
                        'x-page': page
                    }
                })

                console.log(page)

                const data = await response.data;

                console.log(data.length);

                const id = [...data].map(({ id }) => id);

                console.log(id)

                return res.json(id);
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }
        }
    }

    async messageHistory(req: Request, res: Response) {
        const response = await axios.get(
            `${process.env.BKP_URL}/${process.env.COMPANY_ID}/history/128391113/message`, {
            headers: {
                Authorization: `Bearer ${process.env.TOKEN}`,
                'x-page': '1'
            }
        })

        const data = await response.data;

        return res.json(data);
    }
}

export {
    HistoryMensages
}
