// tslint:disable-next-line:ban-types
export const isObject = (element: Object) => {
  return typeof element === 'object' && element !== null && Object.prototype.toString.call(element) === '[object Object]';
};

// tslint:disable-next-line:ban-types
export const isArray = (element: Object) => {
  return typeof element === 'object' && element !== null && Object.prototype.toString.call(element) === '[object Array]';
};

// tslint:disable-next-line:ban-types
export const objectHasElements = (element: Object) => {
  return element && isObject(element) && Object.entries(element).length > 0 && isObject(element);
};

