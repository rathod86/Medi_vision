export const toArray = (payload) => {

    if (Array.isArray(payload)) {
        return payload;
    }

    if (Array.isArray(payload?.data)) {
        return payload.data;
    }

    return [];
};


export const toObject = (payload) => {

    if (!payload) {
        return {};
    }

    if (
        typeof payload === "object" &&
        payload.data &&
        typeof payload.data === "object" &&
        !Array.isArray(payload.data)
    ) {
        return payload.data;
    }

    return payload;
};


export const getErrorMessage = (
    error,
    fallback = "Something went wrong."
) => {

    const data = error?.response?.data;

    if (typeof data === "string" && data.trim()) {
        return data;
    }

    if (data?.message) {
        return data.message;
    }

    if (error?.message) {
        return error.message;
    }

    return fallback;
};
