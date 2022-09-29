import { siteTypes } from '../interfaces/cookiePolicy.types';

const isDev = process.env.ENVIRONMENT_TYPE === 'dev';
const siteSetting = isDev ? { sameSite: siteTypes.lax } : { sameSite: siteTypes.none, secure: true };
const cookiePolicy = { httpOnly: true, ...siteSetting };

export default cookiePolicy;
