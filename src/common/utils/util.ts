/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const dayUtil = (): any => {
  const now = new Date();
  const year = now.getFullYear() + '';
  const month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
  const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
  const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
  const min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
  const sec = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
  const nowDay = year + month + day + hour + min + sec;
  return nowDay;
};

export const regDate = () => dayUtil();
export const orderStartDateTime = () => dayUtil();

