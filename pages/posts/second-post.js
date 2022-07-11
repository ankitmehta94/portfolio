import React from 'react'

export default function Box({l = 5}){
    if(l){
        return (<div>Hi {l} <Box l={l-1} /></div>)
    }else{
        return <div>Hi</div>
    }
}