import {sendEmail} from "../../graphqlAPI/libs/postTransportAPI";

const result = () => ({
    statusCode: 200
})

const sendMePhone = phone => {

    const subject = `Обратный звонок`

    const html = `
        <p>Хозяин!!! Бегом метнулся звонить клиенту</p>
        <p>Записывай номер: ${phone}</p>
    `

    return sendEmail({email: "nu.yanchev@gmail.com", html, subject})
}

export async function handler(event) {
    await sendMePhone(event.params.phone)
    return result()
}