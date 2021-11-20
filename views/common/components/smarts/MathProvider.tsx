import React, {useEffect} from "react"

type Props = {
    children: any
}

export default function MathProvider(props: Props) {

    const {children} = props
    useEffect(() => {
        try {
            // @ts-ignore
            MathJax.typeset()
        } catch (e) {
            console.error(e)
        }
    })

    return children
}