export const csvStringToObj = (csvString, delimeter) => {
  try {
    const obj = {};
    const [header, ...lines] = csvString.split('\n');
    const headers = header.split(delimeter);
    obj.headers = headers;
    obj.values = lines.reduce(
      (acc, curr) => [...acc, curr.split(delimeter)],
      []
    );
    return obj;
  } catch (err) {
    console.error(`Ups, something went wrong :(\n${err}`);
  }
};

export const objToCsvString = (obj, delimeter) => {
  try {
    const csvString = Object.values(obj).reduce((acc, curr, idx) => {
      if (idx === 0) {
        return `${curr.join(delimeter)}\n`;
      }
      return (
        acc +
        curr.reduce(
          (innerAcc, innerCurr, innerIdx, innerArr) =>
            innerAcc +
            innerCurr.join(delimeter) +
            (innerIdx < innerArr.length - 1 ? `\n` : ''),
          ''
        )
      );
    }, '');
    return csvString;
  } catch (err) {
    console.error(`Ups, something went wrong :(\n${err}`);
  }
};
