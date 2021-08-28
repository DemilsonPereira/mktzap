import axios from 'axios';
import {
    Request,
    Response
} from 'express';
import pdf from 'html-pdf';
import ejs from 'ejs';

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
    let historyAtendimento = require('./dataAtendimento/all-history-atendimento.json');
    // console.log(contactMessage);
    let historyMensagens = require('./dataMessages/all-history-message.json');
    // console.log(mensagens);


    let dados = await historyAtendimento.map((item: { id: any; name: any; created_at: any; contact_id: any; channelable_type: any; protocol: any; }) => {
        return {
            id: item.id,
            name: item.name,
            created_at: item.created_at,
            contact_id: item.contact_id,
            channelable_type: item.channelable_type,
            protocol: item.protocol
        }
    })

    const history = await dados.reduce((acc: any, current: { id: any; }) => {
        const filteredMessages = historyMensagens.filter((mensagem: { history_id: any; }) => mensagem.history_id === current.id)
        console.log(filteredMessages);

        return [...acc, { ...current, messages: filteredMessages }]
    }, [])

    console.log(history)

    return res.json(history)
}

// async function getMessafesExchangedById() {
//     historyConversation.forEach(async ({ id, name, protocol, created_at, contact_id, channelable_type }, index) => {
//         try {
//             const novoClienteDir = path.resolve(__dirname, 'report', 'message', `wire_icom_message_${protocol}.pdf`);

//             const response = await axios.get(
//                 `${API_URL_MKTZAP}/company/${companyID}/history/${id}/message`, {
//                 headers: {
//                     Authorization: `Bearer ${TOKEN}`,
//                     'x-page': '1'
//                 }
//             });

//             const messagesExchanged = response.data;

//             ejs.renderFile(templateHTML, {
//                 id, name, protocol, created_at, contact_id, channelable_type, messagesExchanged
//             }, (err, html) => {
//                 if (err) return console.log('erro ao gerar arquivo')

//                 pdf.create(html, pdfOptions).toFile(novoClienteDir, (err, res) => {
//                     if (err) return console.log(err, 'erro');
//                     console.log(`successfully generated file ${index + 1} of ${historyConversation.length}`);
//                     return res;
//                 });
//             })

//         } catch (error) {
//             console.log(error);
//         }
//     })
// };

export {
    messageHistory,
    customerHistory,
}
