import axios from 'axios';
import {
    Request,
    Response
} from 'express';

import fs from 'fs';


class HistoryMensages {

    async serviceHistory(req: Request, res: Response) {
        const pageTotal = 2;

        var INITIAL_DATA = [];
        for (var page = 1; page <= pageTotal; page++) {
            var response = await axios.get(`${process.env.BKP_URL}/${process.env.COMPANY_ID}/history`, {
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN}`,
                    'x-page': page
                }
            })

            var arrayCurrently = response.data;
            // var newArray = arrayCurrently.replace(/[\[\]']+/,'');

            INITIAL_DATA.push(arrayCurrently);

            console.log(`page ${page} of ${pageTotal}`);

            fs.appendFile(__dirname + `/dataAtendimento/page_${page}.json`, JSON.stringify(arrayCurrently), (err) => {
                if (err) throw err;
                console.log('successfully generated file!');
            });
        }
    }

    async messageHistory(req: Request, res: Response) {
        const pageTotal = 2;

        var INITIAL_DATA = [];
        for (var page = 1; page <= pageTotal; page++) {
            const response = await axios.get(
                `${process.env.BKP_URL}/${process.env.COMPANY_ID}/message`, {
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN}`,
                    'x-page': '1'
                }
            })

            var arrayCurrently = await response.data;

            INITIAL_DATA.push(arrayCurrently);

            console.log(`page ${page} of ${pageTotal}`);

            fs.appendFile(__dirname + `/dataMessages/page_${page}.json`, JSON.stringify(arrayCurrently), (err) => {
                if (err) throw err;
                console.log('successfully generated file!');
            });
        }
    }
}

export {
    HistoryMensages
}
