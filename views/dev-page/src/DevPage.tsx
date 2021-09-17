import React from "react";
import AppBar from "../../common/components/views/AppBar";
import Container from "../../common/components/views/Container";
import MainBox from "../../common/components/views/MainBox";
import RootDesc from "../../common/components/views/RootDesc";

const LINK_ITEMS = [{id: "root", href: "/", label: "Главная страница"}]
const MESSAGE = "Извините, но эта страница ещё не разработана"

export default function DevPage() {

    return (
        <>
            <AppBar profile={true}/>
            <Container height={256}>
                <MainBox linkItems={LINK_ITEMS}>
                    <RootDesc>{MESSAGE}</RootDesc>
                </MainBox>
            </Container>
        </>
    )
}
