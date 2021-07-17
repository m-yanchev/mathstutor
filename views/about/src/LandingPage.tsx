import React, {ReactNode, UIEventHandler} from 'react';
import "primereact/resources/themes/nova-alt/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import 'primeflex/primeflex.css';
import "./LandingPage.css"
import {Menubar} from 'primereact/menubar';
import {Card} from "primereact/card";
import {ScrollPanel} from "primereact/scrollpanel";
import {Divider} from "primereact/divider";

type Props = {
    path: string
    menuBarHidden?: boolean,
    onScroll?: OnScroll
}

export type OnScroll = (arg0: number) => void

type TextProps = {
    children: ReactNode,
}

function LandingPage(props: Props) {

    const {path, menuBarHidden, onScroll} = props

    const handleEvent: UIEventHandler<HTMLDivElement> = event => {
        if (onScroll) onScroll((event.target as HTMLDivElement).scrollTop)
    }

    const items = [
        {label: "Обо мне", url: path + "#about-me"},
        {label: "Об уроках", url: path + "#about-lessons"},
        {label: "Отзывы", url: path + "#reviews"},
        {label: "Контакты", url: path + "#contacts"}
    ]
    const start =
        <a href={path} style={{color: "var(--text-color)"}} className={"p-mx-3 p-text-bold start"}>
            {"Репетитор по математике"}
        </a>

    const menuBarTop = menuBarHidden ? "-3rem" : "0"

    const H = (props: TextProps) =>
        <h1 style={{color: "var(--text-color)"}}>
            {props.children}
        </h1>
    const P = (props: TextProps) =>
        <p className={"p-component"} style={{color: "var(--text-color)"}}>
            {props.children}
        </p>

    return (
        <>
            <Menubar className={"p-jc-between menu-bar"} model={items} start={start} style={{top: menuBarTop}}/>
            <div className={"body"} onScroll={handleEvent}>
                <div className={"p-grid about-me section"} id={"about-me"}>
                    <div className={"p-col-12 p-md-6 p-lg-4 p-px-3 p-align-center p-grid my-photo"}>
                        <img width={"100%"} src={path + "my-photo.jpg"} alt={"Фото учителя на рабочем месте"}/>
                    </div>
                    <div className={"p-col-12 p-md-6 p-lg-8 desc"}>
                        <H>Обо мне</H>
                        <P>
                            {'Здравствуйте! Моё имя Николай Юрьевич Янчев. Я профессиональный репетитор по математике ' +
                            'и уже 9 лет занимаюсь подготовкой к ЕГЭ по математике профильного уровня. Два прошедших ' +
                            'года мои уроки проходят только в дистанционном формате.'}
                        </P>
                    </div>
                </div>
                <div id={"about-lessons"} className={"about-lessons section"}>
                    <div className={"p-mt-3 desc"}>
                        <H>Об уроках</H>
                        <P>
                            {'Все уроки проводятся лично мной. Уроки дистанционные. Стандартное время занятие ровно один ' +
                            'час. Для проведения уроков я использую студийный микрофон и графический планшет. Процесс ' +
                            'обучения происходит при помощи видеоконференцсвязи и онлайн доски для записей. Практика ' +
                            'показывает, что онлайн занятия не менее эффективны, ' +
                            'чем классические занятия в консервативном стиле при непосредственном контакте учителя и ' +
                            'ученика или группы учеников. При этом у дистанционных занятий масса преимуществ. Каждый из ' +
                            'субъектов учебного процесса находится в удобной привычной домашней обстановке. Не нужно ' +
                            'тратить время на дорогу. Ну и конечно же полностью отсутствуют риски передачи различных ' +
                            'вирусных инфекций.'}
                        </P>
                    </div>
                    <div className={"p-mt-6 p-grid p-jc-between cards"}>
                        <div className={"p-col-12 p-sm-6 p-lg-3"}>
                            <Card className={"card"} title={<div className={"title"}>Индивидуальные занятия</div>}
                                  subTitle={"1 ученик"}
                                  footer={<span className={"p-text-bold"}>1500 руб/час</span>}>
                                <ScrollPanel className={"content"}>
                                    <P>
                                        {'Преимуществом индивидуальных занятий, является высокая эффективность. Этот формат ' +
                                        'позволяет 100% времени урока посвятить ученику. У меня есть возможность при ' +
                                        'необходимости отклоняться от текущей темы и импровизировать получая обратную связь ' +
                                        'от ученика. Такие занятия подходят абсолютно всем, как сильным, так и слабым. ' +
                                        'Недостатком является высокая стоимость.'}
                                    </P>
                                </ScrollPanel>
                            </Card>
                        </div>
                        <div className={"p-col-12 p-sm-6 p-lg-3"}>
                            <Card className={"card"} title={<div className={"title"}>Занятия в паре</div>}
                                  subTitle={"не более 2-х учеников"}
                                  footer={<span className={"p-text-bold"}>1000 руб/час</span>}>
                                <ScrollPanel className={"content"}>
                                    <P>
                                        {'Для того чтобы хорошо усвоить любую тему по математике, не достаточно просто ' +
                                        'послушать учителя. Необходимо закрепить материал на практике. Одним из необходимых ' +
                                        'этапов такого закрепления является самостоятельная работа во время урока. Эта форма ' +
                                        'занятий занимает не менее 50% времени урока. Уменьшение этого времени будет ' +
                                        'приводить к превращению урока в лекцию. Эта особенность позволяет без ущерба для ' +
                                        'эфективности проводить занятие с двумя учениками. При этом все преимущества ' +
                                        'индивидуальных занятий остаются в силе, но стоимость падает.'}
                                    </P>
                                </ScrollPanel>
                            </Card>
                        </div>
                        <div className={"p-col-12 p-sm-6 p-lg-3"}>
                            <Card className={"card"} title={<div className={"title"}>Занятия в минигруппе</div>}
                                  subTitle={"не более 5-ти учеников"}
                                  footer={<span className={"p-text-bold"}>500 руб/час</span>}>
                                <ScrollPanel className={"content"}>
                                    <P>
                                        {'Более бюджетный формат по сравнению с индивидуальными занятиями и занятиями в ' +
                                        'парах. Тем не менее не большой состав учеников позволяет добиться лучшего ' +
                                        'соотношения таких параметров, как цена и эффективность. Подходит для хорошо ' +
                                        'мотивированных и организованных учеников.'}
                                    </P>
                                </ScrollPanel>
                            </Card>
                        </div>
                        <div className={"p-col-12 p-sm-6 p-lg-3"}>
                            <Card className={"card"} title={<div className={"title"}>Занятия в группе</div>}
                                  subTitle={"не более 10-ти учеников"}
                                  footer={<span className={"p-text-bold"}>300 руб/час</span>}>
                                <ScrollPanel className={"content"}>
                                    <P>
                                        {'Самый экономичный формат. При этом вполне возможно эффективно заниматься в группе ' +
                                        'при наличии мотивации и проявлении интереса к учебному процессу. Подходит для ' +
                                        'хорошо мотивированных и организованных учеников.'}
                                    </P>
                                </ScrollPanel>
                            </Card>
                        </div>
                    </div>
                </div>
                <div id={"reviews"} className={"reviews section"}>
                    <div className={"desc"}>
                        <H>Отзывы</H>
                        <P>
                            {'Более половины моих учеников нашли меня с помощью известного сервиса "Профи". ' +
                            'Админитраторы сервиса беспристрасно собирают отзывы. За время моей деятельности под ' +
                            'моей анкетой уже накопилось достаточное их количество, чтобы можно было сложить мнение обо ' +
                            'мне. Нажимайте на ссылку и читайте, что пишут о моих занятиях.'}
                        </P>
                        <a style={{color: "var(--primary-color)"}} className={"p-component p-text-bold"}
                           target={"_blank"} href={"https://profi.ru/profile/YanchevNU/#reviews-tab"}
                           rel={"noreferrer"}>
                            {"Отзывы на Профи"}
                        </a>
                    </div>
                </div>
                <div id={"contacts"} className={"contacts section"}>
                    <div className={"desc"}>
                        <H>Контакты</H>
                        <P>
                            {'Если Вы заинтересовались, хотите связаться со мной и поподробней распросить, ' +
                            'договориться о времени занятий, то можете написать мне в Whatsapp или в Viber. Вы ' +
                            'можете позвонить мне. Если я не ответил, то у меня вероятно идет урок, но я в любом ' +
                            'случае перезвоню, когда освобожусь.'}
                        </P>
                        <P>
                            {'Мне можно позвонить или написать на номер: '}
                            <a style={{color: "var(--primary-color)"}} href={"tel:+79199628192"}>
                            <span className={"p-text-bold"} style={{whiteSpace: "nowrap"}}>
                                {'+7 (919) 962-81-92'}
                            </span>
                            </a>
                        </P>
                    </div>
                </div>
                <Divider/>
                <div className={"p-grid p-jc-around footer section"}>
                    <div className={"p-grid p-col-12 p-sm-10"}>
                        <span className={"p-component p-col-12 p-md-6 pi pi-user"} style={{'fontSize': '1em'}}>
                            {" Янчев Николай Юрьевич"}
                        </span>
                        <a className={"p-component p-col-12 p-md-6"} style={{color: "var(--text-color)"}}
                           href={"tel:+79199628192"}>
                            <span className={"pi pi-phone"} style={{'fontSize': '1em'}}> +7 (919) 962-81-92</span>
                        </a>
                    </div>
                    <div className={"p-grid p-col-12 p-sm-2"}>
                        <a className={"p-component p-col-2 p-sm-6"} style={{color: "var(--text-color)"}} target={"_blank"}
                           rel={"noreferrer"} href={"https://www.youtube.com/channel/UClptgN0DcLo_x_E9bo5eDTA"}>
                            <span className={"pi pi-youtube"} style={{'fontSize': '1.5em'}}/>
                        </a>
                        <a className={"p-component p-col-2 p-sm-6"} style={{color: "var(--text-color)"}}
                           href={"mailto:n.yanchev@yandex.ru"}>
                            <span className={"pi pi-envelope"} style={{'fontSize': '1.5em'}}/>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingPage;