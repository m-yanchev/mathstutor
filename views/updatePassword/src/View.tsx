import React from 'react';
import MainButton from "../../common/components/views/MainButton";
import NewPasswordInput from "../../common/components/smarts/NewPasswordInput";

type Props = {
    onChange: (password: string) => void,
    onConfirm: () => void,
    disable: boolean
}

export default function (props: Props) {

    const {onChange, onConfirm, disable} = props

    const handleConfirm = () => {
        if (!disable) onConfirm()
    }

    return (
        <>
            <NewPasswordInput onChange={onChange} onConfirm={handleConfirm}/>
            <MainButton onClick={handleConfirm}>Подтвердить</MainButton>
        </>
    )
}