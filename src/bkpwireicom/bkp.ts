import axios from 'axios';
import {
    Request,
    Response
} from 'express';

import fs from 'fs';
class HistoryMensages {
    public response = []

    async serviceHistory(req: Request, res: Response) {
        const file = __dirname + '/serviceHistory.json';
        const ids = [];
        for (var page = 1; page <= 1; page++) { //469
            const response = await axios.get(
                `${process.env.BKP_URL}/${process.env.COMPANY_ID}/history`, {
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN}`,
                    'x-page': page
                }
            })
            const data = await response.data;

            // Salvar arquivo em JSON sem sobrescrever
            // fs.appendFile(file, JSON.stringify(data), err => {
            //     console.log(err || 'Arquivo salvo');
            // });
            // console.log(data)

            ids.push(data)
            // console.log(ids.push(data))
            // console.log(data.length);
        }

        return res.json(ids)
        // return ids.flat(Infinity)
    }

    async messageHistory(req: Request, res: Response) {
        let contactMessage = require('./serviceHistory.json');
        let { id } = contactMessage[0]
        const response = await axios.get(
            `${process.env.BKP_URL}/${process.env.COMPANY_ID}/history/${id}/message`, {
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
