export const HTTP_ERROR = {
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    serverError: {
        status: 500
    },
    genericError: {
        status: 515
    },
    internetConnectivity: 511,
    unauthorizedNewLogin: '3000',
    timeout: {
        status: 408,
        name: 'TimeoutError',
        description: 'Timeout has occurred'
    },
    timeoutDeprecated: 408
};
