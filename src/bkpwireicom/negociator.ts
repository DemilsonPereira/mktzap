import axios from 'axios';
import {
    Request,
    Response
} from 'express';

async function serviceHistory(req: Request, res: Response) {
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

        ids.push(data)
        // console.log(ids.push(data))
        // console.log(data.length);
    }

    return res.json(ids)
    // return ids.flat(Infinity)
}

async function messageHistory() {
    let contactMessage = require('./serviceHistory.json');
    const ids = [];
    for (var i = 0; i < contactMessage.length; i++) {
        if (contactMessage[i].id != null || contactMessage[i].id != undefined) {
            const response = await axios.get(
                `${process.env.BKP_URL}/${process.env.COMPANY_ID}/history/${contactMessage[i].id}/message`, {
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN}`,
                    'x-page': '1'
                }
            });

            const data = await response.data;
            // console.log(data);

            ids.push(data)
            // console.log(ids);
        }
    }
    return ids
}

async function customerHistory(req: Request, res: Response) {
    let contactMessage = require('./serviceHistory.json');
    // console.log(contactMessage);
    const mensagens = await messageHistory()

    let { id, name, created_at, contact_id, channelable_type, protocol } = contactMessage

    let dados = contactMessage.map((item: { id: any; name: any; created_at: any; contact_id: any; channelable_type: any; protocol: any; }) => {
        return {
            id: item.id,
            name: item.name,
            created_at: item.created_at,
            contact_id: item.contact_id,
            channelable_type: item.channelable_type,
            protocol: item.protocol
        }
    })

    console.log([dados])


    // const data = { id, name, created_at, contact_id, channelable_type, protocol, mensagens }

    // console.log(data)

    return res.json(dados)
}

export {
    messageHistory,
    customerHistory,
    serviceHistory
}
