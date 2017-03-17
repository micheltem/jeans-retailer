import { groupBy } from 'lodash';

const compare = (a, b) => {
  if (a.count > b.count)
    return -1;
  if (a.count < b.count)
    return 1;
  return 0;
}

const fns = {
  groupData: (data, filter, filter2) => {
    let grouped = groupBy(data, filter);
    Object.keys(grouped).forEach((key) => {
      if(filter2) {
        grouped[key] = groupBy(grouped[key], filter2);
         Object.keys(grouped[key]).forEach((key2) => {
           grouped[key][key2] = grouped[key][key2].sort(compare);
        })
      } else {
        grouped[key] = grouped[key].sort(compare);
      }
    })
    return grouped;
  },
  groupDataByTag: (data, filter, filter2) => {
    return groupBy(data, (item) => {
      const key = item[filter] + (filter2 ? ('_'+(item[filter2]||'')) : '');
      return key.trim()
    })
  },
  sum: (items, prop ='count') => {
    let total = 0
    for ( var i = 0, len = items.length; i < len; i++ ) {
      total += items[i][prop];
    }
    return total;
  },
  capitalise: (string) => {
    if(!string || !string.length) {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  enrich: (row) => {
    row.month = row.orderDate.match(/\d\d\/(\d\d)\/\d\d\d\d/)[1];
    return row;
  }
}

export default fns;
