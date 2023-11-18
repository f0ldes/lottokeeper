import { useState } from "react";

const useRequest = (requestFunction) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const executeRequest = async (...args) => {
        setLoading(true);
        try {
            const response = await requestFunction(...args);
            setData(response.data)
            return response.data;
        } catch(err) {
            const errorMessage = err.response && err.response.data && err.response.data.message ? error.response.data.message : 'Something unexpected happened.';
            setError({message: errorMessage});
        } finally {
            setLoading(false);
        };
    };

    return { executeRequest, loading, data, error };
};

export default useRequest;