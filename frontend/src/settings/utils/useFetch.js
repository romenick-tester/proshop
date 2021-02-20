import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
        
    const fetchData = async(url) => {
        setLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            if(data) {
                setData(data);
                setLoading(false);
            } else {
                setData({});
                setLoading(false);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchData(url);
    }, [url]);

    return {loading, data};
}

export default useFetch;