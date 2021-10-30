import React from 'react';
import FinalTest from "./FinalTest";
import RootDesc from "../../common/components/views/RootDesc";
import Lesson from "../../common/rules/Lesson";

const NOT_FINAL_TEST_MESSAGE = 'Итоговый тест для этого урока не разработан.'

type Props = {
    lesson: Lesson
}

export default function LessonView(props: Props) {

    const {lesson} = props

    return (
        <>
            {lesson.finalTest ? <FinalTest test={lesson.finalTest}/> : <RootDesc>{NOT_FINAL_TEST_MESSAGE}</RootDesc>}
        </>
    )
}