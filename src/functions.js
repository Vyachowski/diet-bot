function getCurrentTime() {
  return Math.floor(Date.now() / 1000);
}

function hasPassedGivenDays(targetTime, daysToCheck = 10) {
  if (!targetTime) {
    return true;
  }

  const SECONDS_IN_DAY = 86400;
  const secondsPassed = daysToCheck * SECONDS_IN_DAY;

  const currentTime = getCurrentTime();
  const timeAgo = currentTime - secondsPassed;

  return targetTime <= timeAgo;
}

function mergeAndSumObjects(...objects) {
  return objects.reduce((result, obj) => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: (acc[key] || 0) + value,
      };
    }, result);
  }, {});
}

function multiplyObjectValues(obj, multiplier) {
  for (let key in obj) {
    if (typeof obj[key] === "number") {
      obj[key] *= multiplier;
    }
  }
  return obj;
}

function objectValuesToNumber(key, value) {
  const parsedValue = parseFloat(value);
  return !isNaN(parsedValue) ? parsedValue : value;
}

function camelCaseTextToNormal(text) {
  return (
    text.charAt(0).toUpperCase() +
    text
      .slice(1)
      .replace(/([A-Z])/g, " $1")
      .toLowerCase()
  );
}

function objectToTextColumn(obj) {
  const entries = Object.entries(obj);
  const normalizedTextSorted = entries
    .map(([name, value]) => [camelCaseTextToNormal(name), value])
    .toSorted();
  return normalizedTextSorted.join("g \n").replaceAll(",", ": ") + "g";
}

export {
  getCurrentTime,
  hasPassedGivenDays,
  mergeAndSumObjects,
  multiplyObjectValues,
  objectToTextColumn,
  objectValuesToNumber,
};

