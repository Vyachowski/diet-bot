function getCurrentTime() {
  const today = Math.floor(Date.now() / 1000);
  return today;
}

function hasPassedGivenDays(targetTime, daysToCheck = 10) {
  if (targetTime === null || targetTime === undefined) {
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
    if (typeof obj[key] === 'number') {
      obj[key] *= multiplier;
    }
  }
  return obj;
}

function camelCaseToText (text) {
  const normalizedText = text.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join(' ');
  return normalizedText.charAt(0).toUpperCase() + normalizedText.slice(1);
}

export {
  getCurrentTime,
  hasPassedGivenDays,
  mergeAndSumObjects,
  multiplyObjectValues,
  camelCaseToText
};