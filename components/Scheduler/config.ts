export type Config = {
  start: Date;
  end: Date;
};

const oneYearAgo = new Date();
oneYearAgo.setFullYear(new Date().getFullYear() - 1);
const oneYearFromNow = new Date();
oneYearFromNow.setFullYear(new Date().getFullYear() + 1);

const config: Config = {
  start: new Date(),
  end: oneYearFromNow,
};

export default config;
