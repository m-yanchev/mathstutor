import React, {ReactNode, useState} from 'react';
import "primereact/resources/themes/nova-alt/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import 'primeflex/primeflex.css';
import "./LandingPage.css"
import {ScrollPanel} from "primereact/scrollpanel";
import {Divider} from "primereact/divider";
import {InputMask} from 'primereact/inputmask';
import AppBar from "../../common/components/views/AppBar";
import {LOGO} from "../../common/constants";
import CallbackDialog from "./CallbackDialog";
import {ErrorSnackbar} from "../../common/components/views/ErrorSnackbar";
import {yandexMetrica} from "./yandexMetrica";
import LinkMenu from "../../common/components/views/LinkMenu";
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, Toolbar, Box, Card, CardContent, Grid, Hidden,
    Slide, useScrollTrigger, CardActions, Button, CardHeader, IconButton, Link, Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const FAILED_MESSAGE = "Извините, не получилось передать номер телефона Николай Юрьевичу. Попробуйте повторить ещё раз."
const PATH = "about"

type TextProps = {
    children: ReactNode
}

type AProps = {
    sx?: any,
    href: string,
    children: ReactNode,
    target?: string
}

function MenuBar() {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const items = [
        {id: "about-me", href: `/${PATH}/#about-me`, label: "Обо мне"},
        {id: "about-lessons", href: `/${PATH}/#about-lessons`, label: "Об уроках"},
        // {id: "first-lesson", href: `/${PATH}/#first-lesson`, label: "Первый урок"},
        {id: "formats", href: `/${PATH}/#formats`, label: "Форматы"},
        {id: "reviews", href: `/${PATH}/#reviews`, label: "Отзывы"},
        {id: "contacts", href: `/${PATH}/#contacts`, label: "Контакты"},
    ]


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const MenuLink = ({children, href, onClick}) =>
        <MenuItem onClick={onClick}>
            <Link href={href}>
                {children}
            </Link>
        </MenuItem>

    const ToolbarLink = ({children, href}) =>
        <Link sx={{padding: "0.4rem"}} href={href} color={"inherit"} variant={"subtitle2"}>
            {children}
        </Link>

    const MenuButton = ({onClick, ...rest}) =>
        <IconButton edge={"end"} color={"inherit"} onClick={onClick} {...rest}>
            <MenuIcon/>
        </IconButton>

    return (
        <AppBar>
            <LinkMenu sx={{display: {xs: "block", sm: "block", md: "none", lg: "none", xl: "none"}}} id={"app-menu"}
                      items={items} MenuButton={MenuButton}/>
            <Grid sx={{display: {xs: "none", sm: "none", md: "block", lg: "block", xl: "block"}, width: "33rem"}}
                  container>
                {items.map(item => <ToolbarLink key={item.id} href={item.href}>{item.label}</ToolbarLink>)}
            </Grid>
        </AppBar>
    )
}

function LandingPage() {

    const [callbackDialogOpen, setCallbackDialogOpen] = useState(false)
    const [failedMessage, setFailedMessage] = useState(null)

    const handleOpenCallbackDialog = () => {
        setCallbackDialogOpen(true)
        yandexMetrica({key: 84140974, targetName: 'call-form'})
    }
    const handleCloseCallbackDialog = () => setCallbackDialogOpen(false)
    const handleFail = () => {
        console.log("onFail")
        setFailedMessage(FAILED_MESSAGE)
    }
    const handleSuccess = () => setFailedMessage(null)

    const H = (props: TextProps) =>
        <Typography sx={{margin: "0 0 1rem 16px"}} variant={"h1"}>
            {props.children}
        </Typography>
    const P = (props: TextProps) =>
        <Typography sx={{padding: "0 1rem", marginBottom: "1rem", lineHeight: 2}}>
            {props.children}
        </Typography>
    const A = ({children, ...rest}: AProps) =>
        <Link {...rest} variant={"body1"}>
            <b>{children}</b>
        </Link>
    const SimpleSection = ({id, title, children}) =>
        <Box id={id} sx={{padding: "4rem 2rem 0 2rem"}}>
            <H>{title}</H>
            {children}
        </Box>
    const ActionButton = ({children, ...rest}) =>
        <Button onClick={handleOpenCallbackDialog} variant={"outlined"} color={"primary"} {...rest}>
            {children}
        </Button>
    const CardSubtitle = ({price, personCountDesc}) =>
        <>
            <Typography variant={"subtitle1"} color={"secondary"}>
                {`${price} руб/час`}
            </Typography>
            <Typography variant={"subtitle1"}>
                {personCountDesc}
            </Typography>
        </>
    const CardFooter = ({price}) =>
        <CardActions>
            <ActionButton size={"small"} variant={"text"}>Записаться</ActionButton>
        </CardActions>

    const FormatCard = ({price, children, subtitle, title}) =>
        <div className={"p-col-12 p-sm-6 p-lg-3"}>
            <Card raised>
                <CardHeader title={title}
                            subheader={<CardSubtitle price={price} personCountDesc={subtitle}/>}
                            titleTypographyProps={{variant: "h2", component: "h2", sx: {height: "3.25rem"}}}/>
                <CardContent>
                    <ScrollPanel className={"bar"} style={{height: "12rem"}}>
                        <Typography variant={"body2"}>{children}</Typography>
                    </ScrollPanel>
                </CardContent>
                <CardFooter price={price}/>
            </Card>
        </div>

    return (
        <>
            <MenuBar/>
            <Box sx={{paddingTop: "64px"}}>
                <SimpleSection id={"about-me"} title={"Обо мне"}>
                    <div className={"p-grid"}>
                        <div className={"p-col-12 p-md-6 p-lg-4 p-px-3 p-align-center p-grid my-photo"}>
                            <img width={"100%"} src={`/${PATH}/my-photo.jpg`} alt={"Фото учителя на рабочем месте"}/>
                        </div>
                        <div className={"p-col-12 p-md-6 p-lg-8"}>
                            <P>Здравствуйте!</P>
                            <P>
                                {'Я Николай Юрьевич Янчев профессиональный репетитор по математике. ' +
                                'Уже 9 лет занимаюсь подготовкой к ЕГЭ по математике профильного уровня. Два последних ' +
                                'года мои уроки проходят только в дистанционном формате. Мною накоплен достаточный ' +
                                'опыт для подготовки к ЕГЭ профильного уровня на 100 баллов.'}
                            </P>
                            <P>
                                {'Мне очень интересна тема автоматизации учебного процесса. Веду работу над своим веб-ресурсом. ' +
                                'Уже сейчас, мои ученики при желании получают возможность просматривать мои видеоуроки и ' +
                                'заниматься дополнительно без учителя, а значит усиливать свои знания бесплатно. Уже в этом ' +
                                'году появится много других интересных функций и это позволит разнообразить и улучшить ' +
                                'учебный процесс.'}
                            </P>
                            <ActionButton>Попросить перезвонить</ActionButton>
                        </div>
                    </div>
                </SimpleSection>
                <SimpleSection id={"about-lessons"} title={"Об уроках"}>
                    <P>
                        {'Все уроки проводятся лично мной. Уроки дистанционные. Стандартное время занятия ровно один ' +
                        'час. Для проведения уроков использую студийный микрофон и графический планшет. Максимально ' +
                        'ограничиваю занятия от посторонних шумов, что дает возможность не терять эффективность ' +
                        'из-за удаленности от ученика. Процесс ' +
                        'обучения происходит при помощи видеоконференцсвязи и онлайн доски для записей. Практика ' +
                        'показывает, что онлайн занятия не менее эффективны, ' +
                        'чем классические занятия в консервативном стиле при непосредственном контакте учителя и ' +
                        'ученика или группы учеников. При этом у дистанционных занятий масса преимуществ. Каждый из ' +
                        'участников учебного процесса находится в удобной привычной домашней обстановке. ' +
                        'Графический планшет в совокупности с онлайн доской позволяют создать общее пространство, ' +
                        'которое по удобству превышает привычное индивидуальное занятие с заглядыванием в тетрадку. ' +
                        'Не нужно тратить время на дорогу. Ну и конечно же полностью отсутствуют риски передачи различных ' +
                        'вирусных инфекций.'}
                    </P>
                    <P>
                        {'Важным элементом моей методики является самостоятельная работа. Без неё невозможно быстро ' +
                        'и качественно подготовиться к экзаменам. На моих занятиях ученики сталкиваются с двумя ' +
                        'типами самостоятельных работ. Первый тип - это работа под присмотром учителя, выполняется ' +
                        'на занятии и применяется для получения умения решать задания на только что изученную тему. ' +
                        'Второй тип - это самостоятельная работа без учителя, выполняется между занятиями и ' +
                        'применяется для закрепления вновь или давно изученных тем.'}
                    </P>
                    <ActionButton>Записаться</ActionButton>
                </SimpleSection>
                {/*<SimpleSection id={"first-lesson"} title={"О первом занятии"}>
                    <P>
                        {'Первое занятие '}
                        <b>{'абсолютно бесплатно'}</b>
                        {'! На первом занятии узнаю начальный уровень ученика и желаемое ' +
                        'количество баллов. Определяемся с '}
                        <A href={`/${PATH}/#formats`}>{'форматом'}</A>
                        {'. Договариваемся о количестве и времени занятий. Опираясь на полученные данные назначаю ' +
                        'курс. Помогаю зарегистрироваться и настроить работу в необходимых веб приложениях.'}
                    </P>
                    <ActionButton>Договориться о времени</ActionButton>
                </SimpleSection>*/}
                <SimpleSection id={"formats"} title={"Форматы и цены"}>
                    <div id={"formats"} className={"p-grid p-jc-between cards"}>
                        <FormatCard title={"Индивидуальные занятия"} subtitle={"1 ученик"} price={1500}>
                            {'Преимуществом индивидуальных занятий, является высокая эффективность. Этот формат ' +
                            'позволяет 100% времени урока посвятить ученику. Такие занятия подходят абсолютно ' +
                            'всем как сильным, так и слабым. Недостатком является высокая стоимость.'}
                        </FormatCard>
                        <FormatCard title={"Занятия в паре"} subtitle={"не более 2-х учеников"} price={1000}>
                            {'Для того чтобы хорошо усвоить любую тему по математике, не достаточно просто ' +
                            'послушать учителя. Необходимо закрепить материал на практике. Одним из необходимых ' +
                            'этапов такого закрепления является самостоятельная работа во время урока. Эта форма ' +
                            'занятий занимает не менее 50% времени урока. Уменьшение этого времени будет ' +
                            'приводить к превращению урока в лекцию. Эта особенность позволяет без ущерба для ' +
                            'эффективности проводить занятие с двумя учениками. При этом все преимущества ' +
                            'индивидуальных занятий остаются в силе, но стоимость падает.'}
                        </FormatCard>
                        <FormatCard title={"Занятия в минигруппе"} subtitle={"не более 5-ти учеников"} price={500}>
                            {'Более бюджетный формат по сравнению с индивидуальными занятиями и занятиями в ' +
                            'парах. Тем не менее небольшой состав учеников позволяет добиться лучшего ' +
                            'соотношения таких параметров, как цена и эффективность. Подходит для хорошо ' +
                            'мотивированных и организованных учеников.'}
                        </FormatCard>
                        <FormatCard title={"Занятия в группе"} subtitle={"не более 10-ти учеников"} price={"300"}>
                            {'Самый экономичный формат. При этом вполне возможно эффективно заниматься в группе ' +
                            'при наличии мотивации и проявлении интереса к учебному процессу. Подходит для ' +
                            'хорошо мотивированных и организованных учеников.'}
                        </FormatCard>
                    </div>
                </SimpleSection>
                <SimpleSection id={"reviews"} title={"Отзывы"}>
                    <P>
                        {'Более половины моих учеников нашли меня с помощью известного сервиса "Profi.ru". ' +
                        'Админитраторы сервиса беспристрасно собирают отзывы. За время моей деятельности под ' +
                        'моей анкетой уже накопилось достаточное их количество. Нажимайте на ссылку и читайте, ' +
                        'что пишут о моих занятиях.'}
                    </P>
                    <A sx={{marginLeft: "1rem"}} href={"https://profi.ru/profile/YanchevNU/#reviews-tab"}
                       target={"_blank"}>
                        {"Отзывы на Profi.ru"}
                    </A>
                </SimpleSection>
                <SimpleSection id={"contacts"} title={"Контакты"}>
                    <P>
                        {'Если Вы заинтересовались, хотите связаться со мной и поподробнее распросить, ' +
                        'договориться о времени занятий, то можете написать мне в Whatsapp или в Viber. Вы ' +
                        'можете позвонить мне. Если я не ответил, то у меня, вероятно, идет урок, но я в любом ' +
                        'случае перезвоню, когда освобожусь. Мне можно позвонить или написать на номер: '}
                        <A href={"tel:+79199628192"}>
                            <span style={{whiteSpace: "nowrap"}}>
                                {'+7 (919) 962-81-92'}
                            </span>
                        </A>
                    </P>
                    <ActionButton>Попросить перезвонить</ActionButton>
                </SimpleSection>
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
                        <a className={"p-component p-col-2 p-sm-6"} style={{color: "var(--text-color)"}}
                           target={"_blank"}
                           rel={"noreferrer"} href={"https://www.youtube.com/channel/UClptgN0DcLo_x_E9bo5eDTA"}>
                            <span className={"pi pi-youtube"} style={{'fontSize': '1.5em'}}/>
                        </a>
                        <a className={"p-component p-col-2 p-sm-6"} style={{color: "var(--text-color)"}}
                           href={"mailto:n.yanchev@yandex.ru"}>
                            <span className={"pi pi-envelope"} style={{'fontSize': '1.5em'}}/>
                        </a>
                    </div>
                </div>
            </Box>
            <CallbackDialog open={callbackDialogOpen} onClose={handleCloseCallbackDialog} onFail={handleFail}
                            onSuccess={handleSuccess}/>
            <ErrorSnackbar message={failedMessage}/>
        </>
    )
}

export default LandingPage