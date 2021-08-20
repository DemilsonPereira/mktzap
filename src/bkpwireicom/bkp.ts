import axios from 'axios';
import {
    Request,
    Response
} from 'express';

import fs from 'fs';
import path from 'path';


class HistoryMensages {
    async serviceHistory(req: Request, res: Response) {
        const file = __dirname + '/teste.json';
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
            fs.appendFile(file, JSON.stringify(data), err => {
                console.log(err || 'Arquivo salvo');
            });
            // console.log(data)

            // ids.push(data)
            console.log(ids.push(data))
            console.log(data.length);
        }

        return ids
        // return ids.flat(Infinity)
    }

    // async lerJson(req: Request, res: Response) {
    //     let data = fs.readFileSync(file_path + file_name);
    //     data = JSON.parse(data);
    //     console.log(data);
    // }

    async messageHistory(req: Request, res: Response) {
        const response = await axios.get(
            `${process.env.BKP_URL}/${process.env.COMPANY_ID}/history/66733102/message`, {
            headers: {
                Authorization: `Bearer ${process.env.TOKEN}`,
                'x-page': '1'
            }
        })

        const data = await response.data;

        return res.json(data);
    }
}

// copyFile('source.txt', 'destination.txt', HistoryMensages.toString);

export {
    HistoryMensages
}
