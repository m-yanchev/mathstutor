import React from "react";
import Container from "../../common/components/views/Container";
import RootDesc from "../../common/components/views/RootDesc";

export default function VerifiedInfo() {
    return (
        <Container>
            <RootDesc>
                {'На указанный электронный адрес отправлено письмо. Для завершения ' +
                'регистрации откройте письмо и кликните по ссылке.'}
            </RootDesc>
        </Container>
    )
}