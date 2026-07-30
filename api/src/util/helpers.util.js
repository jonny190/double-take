// push onto a dedup-window array and trim it in place to the last `max`, so
// long-running processes don't grow the array (or its .includes scans)
// unbounded. Trims in place to preserve any shared reference.
module.exports.boundedPush = (arr, value, max = 1000) => {
  arr.push(value);
  if (arr.length > max) arr.splice(0, arr.length - max);
  return arr;
};

module.exports.oxfordComma = (array) =>
  array.length > 2
    ? array
        .slice(0, array.length - 1)
        .concat(`and ${array.slice(-1)}`)
        .join(', ')
    : array.join(' and ');
