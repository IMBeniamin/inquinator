import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2'

firstChart = (props) =>{
    const [dataChart, setDataChart] = useState(Object)
    useEffect(() =>{
        fetch(``,{
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            },
        })
        .then()
        .then()
    },[props.parentCallBack()])

    return(
        <Bar />
    )
}