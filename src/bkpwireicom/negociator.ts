import axios from 'axios';
import {
    Request,
    Response
} from 'express';

async function messageHistory() {
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

    return data;
}

async function customerHistory(req: Request, res: Response) {
    let contactMessage = require('./serviceHistory.json');
    // console.log(contactMessage);
    const mensagens = await messageHistory()

    let { id, name, created_at, contact_id, channelable_type, protocol } = contactMessage[0]

    const data = { id, name, created_at, contact_id, channelable_type, protocol, mensagens }

    console.log(data)

    return res.json(data)
}

export {
    messageHistory,
    customerHistory
}
