import React, {useEffect} from "react"

type Props = {
    children: any
}

export default function MathProvider(props: Props) {

    const {children} = props
    useEffect(() => {
        // @ts-ignore
        window.MathJax.typeset()
    })

    return children
}