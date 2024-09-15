export const checkTimeSince = (time: Date) => {
    const t2 = new Date();
    const t = (t2.getTime() - time.getTime()) / (1000 * 3600 * 24);
    const hr = (t2.getTime() - time.getTime()) / (1000 * 3600);
    const min = (t2.getTime() - time.getTime()) / (1000 * 60);
  
    if (t > 365) {
      return `${Math.floor(t / 365)} years`;
    } else if (t === 365) {
      return `${Math.floor(t / 365)} year`;
    } else if (t === 30) {
      return `${Math.floor(t / 30)} month`;
    } else if (t > 30 && t < 365) {
      return `${Math.floor(t / 30)} months`;
    } else if (t === 7) {
      return `${Math.floor(t / 7)} week`;
    } else if (t > 7 && t < 30) {
      return `${Math.floor(t / 7)} weeks`;
    } else if (t === 1) {
      return `${Math.floor(t / 1)} yesterday`;
    } else if (t > 1 && t < 7) {
      return `${Math.floor(t / 1)} days`;
    } else if (hr === 1) {
      return `${Math.floor(hr / 1)} an hour`;
    } else if (hr > 1 && hr < 24) {
      return `${Math.floor(hr / 1)} hours`;
    } else if (min === 1) {
      return `${Math.floor(min / 1)} a minute`;
    } else if (min > 1 && min < 60) {
      return `${Math.floor(min / 1)} minutes`;
    } else if (min < 1) {
      return `just now`;
    }
  };



