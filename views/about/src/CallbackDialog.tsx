import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@material-ui/core";
import {InputMask} from "primereact/inputmask";
import {yandexMetrica} from "./yandexMetrica";

export default function CallbackDialog({open, onClose, onFail, onSuccess}) {

    const [callbackPhone, setCallbackPhone] = useState("")

    const handleChange = event => setCallbackPhone(event.value)
    const handleClose = () => {
        onSuccess()
        onClose()
    }
    const handleConfirm = () => {
        fetch(`/api/send-me-phone?phone=${callbackPhone}`).then(() => onSuccess()).catch(() => onFail())
        yandexMetrica({key:84140974, targetName: 'send-me-phone'})
        onClose()
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="callback-dialog">
                <DialogTitle>
                    {"Записаться"}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {"Введите номер телефона для обратного вызова. Я свяжусь с Вами и мы обсудим детали."}
                    </Typography>
                    <InputMask mask="+7 (999) 999-9999" value={callbackPhone}
                               onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color={"secondary"}>Закрыть</Button>
                    <Button autoFocus onClick={handleConfirm} color={"primary"}>
                        {"Подтвердить"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}