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





export const board = {
  createBoard(boardCreateDTO) {
    let board = { ...boardCreateDTO }
    board.regDate = regDate();
    board.useYn = true;
    board.modifyDate = "";
    board.modifyWriter = "";
    board.delDate = "";
    board.delWriter = "";
    board.likeAction = 0;
    board.dislikeAction = 0;
    board.hideYn = false;
    board.startDate = "";
    board.endDate = "";
    return board;
  },
  updateBoard(boardCreateDTO) {
    let board = { ...boardCreateDTO }
    board.modifyDate = regDate();
    return board;
  },
  getSearchOption(boardSearchDTO) {
    let options = { ...boardSearchDTO };

    if (options.pageNumber === undefined) {
      options.pageNumber = 1;
    }
    if (options.max === undefined) {
      options.max = 10;
    }
    if (options.offset === undefined) {
      options.offset = options.max * options.pageNumber;
    }
    if (options.sort === undefined) {
      options.sort = "bno";
    }
    if (options.order === undefined) {
      options.order = "desc"
    }
    if (options.order === "desc") {
      options.order = -1;
    } else {
      options.order = 1;
    }

    let order = {}
    order[options.sort] = options.order;
    options.sort = order;
    if (options.keyword === undefined) {
      options.keyword = "";
    }
    if (options.gnb === undefined) {
      options.gnb = "title";
    }

    let keyword = {};
    let regex = {
      $regex: options.keyword
    }
    keyword[options.gnb] = regex;
    options.keyword = keyword;

    return options;
  },
}
