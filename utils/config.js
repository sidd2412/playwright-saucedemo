export const environments = {
  qa: 'https://www.saucedemo.com',
  stage: 'https://www.saucedemo.com',
};

export const users = {
  admin: { username: 'admin_user', password: 'admin_pass' },
  standard: { username: 'standard_user', password: 'secret_sauce' },
};

export const config = {
  envName: process.env.ENV || 'qa',
  baseUrl: environments[process.env.ENV || 'qa'],
  //baseUrl: 'https://www.saucedemo.com',
  user: users[process.env.ROLE || 'standard'], // Selects user dynamically
  headless: process.env.HEADLESS !== 'false',
  selectedBrowsers: (process.env.BROWSERS || 'Chrome').split(',')
};
