import {useEffect, useState} from "react";

const TIME_INTERVAL = 1000

const useMockProgress = () => {
    const [progress, setProgress] = useState(0)
    let timer: number

    useEffect(() => {
        timer = setInterval(() => {
            setProgress(prev => prev < 1 ? prev + 0.1 : 0)
        }, TIME_INTERVAL)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return progress
}

export default useMockProgress
