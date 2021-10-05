import React from 'react';
import Header from "../../common/components/views/Header";
import FinalTest from "./FinalTest";
import RootDesc from "../../common/components/views/RootDesc";
import Lesson from "../../common/rules/Lesson";
import {makeStyles} from "@material-ui/core";

const NOT_FINAL_TEST_MESSAGE = 'Итоговый тест для этого урока не разработан.'

const useStyles = makeStyles({
    header: {
        marginLeft: "16px"
    }
})

type Props = {
    lesson: Lesson
}

export default function LessonView(props: Props) {

    const {lesson} = props
    const classes = useStyles()

    return (
        <>
            <Header className={classes.header} title={lesson.title}>Урок:</Header>
            {lesson.finalTest ? <FinalTest test={lesson.finalTest}/> : <RootDesc>{NOT_FINAL_TEST_MESSAGE}</RootDesc>}
        </>
    )
}