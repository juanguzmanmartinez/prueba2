export const isObject = (element: object | any) => {
    return typeof element === 'object' && element !== null && Object.prototype.toString.call(element) === '[object Object]';
};

export const isArray = (element: object | any) => {
    return typeof element === 'object' && element !== null && Object.prototype.toString.call(element) === '[object Array]';
};

export const objectHasElements = (element: object | any) => {
    return element && isObject(element) && Object.entries(element).length > 0 && isObject(element);
};

