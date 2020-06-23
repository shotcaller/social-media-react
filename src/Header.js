import React from 'react'
import Appbar from './Components/Appbar'



export default function Header(props) {
    return (
        <Appbar loggedIn={props.loggedIn} setloggedIn={props.setloggedIn} />
    )
}
