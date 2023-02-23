import React, { useState, useEffect } from 'react';
const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method,
                body: JSON.stringify(requestConfig.body),
                headers: requestConfig.headers
            }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            applyData(data)
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };
    return {
        isLoading,
        error,
        sendRequest
    }

}
export default useHttp;