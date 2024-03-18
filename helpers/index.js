const moment = require("moment/moment");
const { OK, RECORD_FOUND } = require("../constants/constants");
const Models = require('../models')
const { Op } = require('sequelize');

module.exports.sendResponse = (
  data = null,
  code = OK,
  message = RECORD_FOUND
) => {
  return {
    data,
    code,
    message,
  };
};

module.exports.useFilter = (result, filter) => {
  const filters = filter;
  const data = result.filter((user) => {
    let isValid = true;
    for (key in filters) {
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });

  return data
}

module.exports.getUserId = async (id) => {
  const getUserId = await Models.Users.findAll({
    attributes: ['id'],
    where: {
      [Op.or]: {
        parent_id: id,
        id: id
      }
    }
  })

  const userId = getUserId.map((data) => data.id)

  return userId
}

module.exports.usePagination = (query, data, keys) => {
  // console.log('....', query, keys);
  const { page, pageSize, search } = query;
  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize);

  Object.filter = (obj, predicate) =>
    Object.assign(...Object.keys(obj)
      .filter(key => predicate(obj[key]))
      .map(key => ({ [key]: obj[key] })));

  var sorted = Object.filter(query, query => query == 'DESC' || query == 'ASC')

  let filteredData = data;

  // Apply search query if provided
  var filter = Object.entries(query)
    .filter(([key, value]) => {
      // Replace the condition below with your own filtering logic
      return value !== 'ASC' && value !== 'DESC' && key !== 'page' && key !== 'pageSize' && key !== 'search';
    })
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {})

  function checkDateFormat(dateString) {
    const formats = [
      { format: 'YYYY-MM-DD', regex: /^\d{4}-\d{2}-\d{2}$/ },
      { format: 'DD-MM-YYYY', regex: /^\d{2}-\d{2}-\d{4}$/ },
      { format: 'DD-MMM-YYYY', regex: /^\d{2}-[A-Za-z]{3}-\d{4}$/ },
      { format: 'YYYY-MMM-DD', regex: /^\d{4}-[A-Za-z]{3}-\d{2}$/ },
      { format: 'YYYY/MM/DD', regex: /^\d{4}\/\d{2}\/\d{2}$/ }
      // { format: "YYYY-MM-DDTHH:mm:ss.sssZ", regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/ }
    ];

    for (const format of formats) {
      if (format.regex.test(dateString)) {
        return format.format;
      }
    }

    return false;
  }

  if (search !== undefined || Object.keys(filter).length > 0) {

    let searchKeys;
    let serachValue = [];

    if (Object.values(filter).includes('')) {
      searchKeys = keys;
    } else {
      searchKeys = keys.concat(Object.keys(filter))
      serachValue = serachValue.concat(Object.values(filter))
    }

    search == undefined ? serachValue = serachValue : serachValue = serachValue.concat([search])

    function searchWithKeysAndWithoutKey(searchValueWithKeys, searchValueWithKeyAndValue) {
      const results = data.filter(obj => {
        let matchWithKeys = false;
        let matchWithoutKey = false;

        for (let key of searchKeys) {
          const keys = key.split('.');
          let value = obj;

          for (const k of keys) {
            if (keys.length === 1) {
              for (const v of serachValue) {
                if (value[keys] !== undefined && value[keys] !== null) {
                  if (keys.includes('status') || keys.includes('shipping_status') || typeof value[keys] === 'number') {
                    if (value[key].toString().includes(v)) {
                      return true;
                    }
                  } else {
                    if (value[key].toString().toUpperCase().includes(v.toUpperCase())) {
                      return true;  
                    }
                  }
                }
              }
            }

            if (!value.hasOwnProperty(k)) {
              value = null;
              break;
            }

            value = value[k];
            for (const v of serachValue) {
              if (value[keys[1]] !== undefined && value[keys[1]] !== null) {
                if (value[keys[1]].toString().toUpperCase().includes(v.toUpperCase())) {
                  return true;
                }
              }
            }
          }
        }

        return matchWithKeys || matchWithoutKey;
      });

      return results;
    }

    // console.log("///", serachValue, searchKeys);

    const results = searchWithKeysAndWithoutKey(serachValue)

    filteredData = results
  }

  if (sorted) {
    let key = Object.keys(sorted)[0];

    const sortHelper = (firstKey, secondKey) => {

      if (typeof secondKey == 'string' && typeof firstKey == 'string') {

        if (JSON.stringify(firstKey).includes('-') && JSON.stringify(secondKey).includes('-')) {

          if (checkDateFormat(firstKey) && checkDateFormat(secondKey)) {

            return new Date(firstKey) - new Date(secondKey)

          } else {
            const numberA = parseInt(firstKey.split('-')[1]);
            const numberB = parseInt(secondKey.split('-')[1]);

            return numberA - numberB
          }

        } else {
          return firstKey.localeCompare(secondKey)
        }
      } else if (typeof secondKey == 'number' && typeof firstKey == 'number') {
        return firstKey - secondKey
      } else if (typeof secondKey == 'object' && typeof firstKey == 'object') {
        return new Date(firstKey) - new Date(secondKey)
      }
    }

    if (Object.values(sorted) == 'DESC') {

      filteredData = filteredData.sort((a, b) => {
        const sortKeys = key;

        const value1 = sortKeys.split('.').reduce((o, k) => o[k], a);
        const value2 = sortKeys.split('.').reduce((o, k) => o[k], b);

        return sortHelper(value2, value1)
      });

    } else {

      filteredData = filteredData.sort((a, b) => {
        const sortKeys = key;


        // console.log("><>><>< sort", sortKeys.split('.').reduce((o, k) => o[k]));
        const value1 = sortKeys.split('.').reduce((o, k) => o[k], a);
        const value2 = sortKeys.split('.').reduce((o, k) => o[k], b);

        return sortHelper(value1, value2)
      });

    }
  }

  // Apply pagination
  const paginatedData = filteredData.slice(offset, offset + limit);
  return { pagination: paginatedData, total_entry: filteredData.length, count: filteredData.length / pageSize }
}