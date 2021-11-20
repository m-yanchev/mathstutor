export interface PostTransport {
    sendEmail: SendEmail
}

export type SendEmail = (props: Props) => Promise<boolean | Error>

type Props = {
    email: string,
    html: string,
    subject: string
}