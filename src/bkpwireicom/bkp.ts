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

            // Salvar arquivo sem sobrescrever
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

    // async messageHistoryModel() {
    //     let contactMessage = require('./serviceHistory.json');
    //     let { id } = contactMessage[0]
    //     const response = await axios.get(
    //         `${process.env.BKP_URL}/${process.env.COMPANY_ID}/history/${id}/message`, {
    //         headers: {
    //             Authorization: `Bearer ${process.env.TOKEN}`,
    //             'x-page': '1'
    //         }
    //     })

    //     const data = await response.data;

    //     return data;
    // }

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

    async customerHistory(req: Request, res: Response) {
        let contactMessage = require('./serviceHistory.json');
        // console.log(contactMessage);

        let { id, name, created_at, contact_id, channelable_type, protocol } = contactMessage[0]

        const data = { id, name, created_at, contact_id, channelable_type, protocol, message: [
            {
                "id": 316511925,
                "history_id": 24824129,
                "user_id": null,
                "sent_by_operator": 0,
                "received_at": "2018-08-22T18:52:52.000Z",
                "message": "\"Pode me enviar o meu boleto atualizado?\"",
                "created_at": "2018-08-22T18:52:54.000Z",
                "updated_at": "2018-08-22T18:52:54.000Z",
                "sector_id": 6169,
                "is_json": 1,
                "metadata": null,
                "company_id": 874,
                "trigger_id": 27406,
                "is_auto": 0
              },
              {
                "id": 316511940,
                "history_id": 24824129,
                "user_id": null,
                "sent_by_operator": 1,
                "received_at": "2018-08-22T18:52:54.000Z",
                "message": "\"\"",
                "created_at": "2018-08-22T18:52:54.000Z",
                "updated_at": "2018-08-22T18:52:54.000Z",
                "sector_id": 6169,
                "is_json": 1,
                "metadata": null,
                "company_id": 874,
                "trigger_id": null,
                "is_auto": 0
              },
        ] }

        console.log(this.messageHistory)

        // console.log({ data })

        // const data = await response.data;

        // return res.json(data);

        Object.assign(data)

        return res.json(data)
    }
}

export {
    HistoryMensages
}
