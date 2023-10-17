export function idMaker(N) {
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from(Array(N))
    .map(() => S[Math.floor(Math.random() * S.length)])
    .join('');
}

export const uidFactory = (min: number, max: number) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

export function zeroPadding(NUM, LEN) {
  // NUM=値 LEN=桁数
  if (String(NUM).length > LEN) {
    LEN = String(NUM).length;
  }
  return (Array(LEN).join('0') + NUM).slice(-LEN);
}

export function fetcher(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export function formatDate(enableZeroPadding, date) {
  const dt = date ? new Date(date) : new Date();
  const y = dt.getFullYear();
  const m = enableZeroPadding
    ? zeroPadding(dt.getMonth() + 1, 2)
    : dt.getMonth() + 1;
  const d = enableZeroPadding ? zeroPadding(dt.getDate(), 2) : dt.getDate();
  const hh = enableZeroPadding ? zeroPadding(dt.getHours(), 2) : dt.getHours();
  const mm = enableZeroPadding
    ? zeroPadding(dt.getMinutes(), 2)
    : dt.getMinutes();
  const ss = enableZeroPadding
    ? zeroPadding(dt.getSeconds(), 2)
    : dt.getSeconds();

  return {
    y,
    m,
    d,
    hh,
    mm,
    ss,
  };
}

export const setImgPath = fileName => {
  return process.env === 'development' ? `/${fileName}` : `/ea/${fileName}`;
};

export const toggleBodyScroll = (enable: boolean) => {
  if (enable) {
    document.body.classList.add('forbiddenScroll');
  } else {
    document.body.classList.remove('forbiddenScroll');
  }
};

export const checkBuild = text => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`checkBuild ${text}`);
  }
};

export const alphabets = Array.from({length: 26}, (_, i) =>
  String.fromCharCode(97 + i).toUpperCase(),
);

export const setExcludeStr = (str: string) => {
  if (location.href.match('/exclude/')) {
    return `/exclude${str}`;
  } else {
    return str;
  }
};
