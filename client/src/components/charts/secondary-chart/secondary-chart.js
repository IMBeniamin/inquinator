import React, { memo, useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2'

const secondaryChart = (props) =>{
    const [dataChart, setDataChart] = useState(Object)
    useEffect(() =>{
        
        axios.get('').then()

    },[props.parentCallBack])

    return(
        <Bar />
    )
}

export default memo(secondaryChart)