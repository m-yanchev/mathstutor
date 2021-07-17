import React, {useState} from 'react';
import LandingPage, {OnScroll} from "./LandingPage";
import {PATH} from "./constants";

function App() {

    const [scrolling, setScrolling] = useState({prevScrollTop: 0, scrollTop: 0})

    const handleScroll: OnScroll = scrollTop => {
        const newScrollTop = scrollTop
        setScrolling(prevScrolling => ({
                prevScrollTop: prevScrolling.scrollTop,
                scrollTop: newScrollTop
            })
        )
    }

    const menuBarHidden = scrolling.scrollTop - scrolling.prevScrollTop > 0

    return <LandingPage path={PATH} menuBarHidden={menuBarHidden} onScroll={handleScroll}/>
}

export default App;
