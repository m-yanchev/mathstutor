import React from "react";
import Container from "../../common/components/views/Container";
import ResultMessage from "../../common/components/views/ResultMessage";

export default function VerifiedInfo() {
    return (
        <Container>
            <ResultMessage>
                {'На указанный электронный адрес отправлено письмо. Для завершения ' +
                'регистрации откройте письмо и кликните по ссылке.'}
            </ResultMessage>
        </Container>
    )
}