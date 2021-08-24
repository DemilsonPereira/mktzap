import { Router } from 'express';
import { HistoryMensages } from './bkpwireicom/bkp';
import { TokenAcess } from './bkpwireicom/token';
const router = Router();

router.get('/test', (req, res) => {
    return res.json({ msg: 'server running ON' })
});

const historyMensages = new HistoryMensages();
const tokenAcess = new TokenAcess()


router.get('/history/atendimento', historyMensages.serviceHistory);
router.get('/history/message', historyMensages.messageHistory);
router.get('/history/customer', historyMensages.customerHistory);
router.get('/token', tokenAcess.token);


export {
    router
}
