/**
 * Optimized App Parameters
 * Handles environment variables and URL params for your custom backend.
 */

const isNode = typeof window === 'undefined';

const getAppParamValue = (paramName, { defaultValue = null, storageKey = null } = {}) => {
    if (isNode) return defaultValue;

    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get(paramName);

    // 1. If it's in the URL, prioritize it and save to local storage
    if (searchParam) {
        if (storageKey) localStorage.setItem(storageKey, searchParam);
        return searchParam;
    }

    // 2. If not in URL, check Local Storage
    if (storageKey) {
        const storedValue = localStorage.getItem(storageKey);
        if (storedValue) return storedValue;
    }

    // 3. Fallback to default (usually from .env)
    return defaultValue;
};

const getAppParams = () => {
    return {
        // App Identity
        appId: getAppParamValue("app_id", { 
            defaultValue: import.meta.env.VITE_APP_ID || 'portfolio-v1' 
        }),

        // Auth Token (Standard JWT support for your Backend)
        token: getAppParamValue("token", { 
            storageKey: 'auth_token' 
        }),

        // Backend API URL
        apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',

        // Environment state
        isDev: import.meta.env.DEV,
    };
};

export const appParams = getAppParams();

export const updateAuthToken = (newToken) => {
    localStorage.setItem('auth_token', newToken);
    window.location.reload(); // Optional: Refresh to apply the new token everywhere
};