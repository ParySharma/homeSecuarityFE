export const EMPTY_STRING = '';
export const EMPTY_ARRAY = [];
export const EMPTY_OBJECT = {};
export const UNDEFINED = undefined;
export const NULL = null;
export const EMPTY_FIELD = '--';
export const LIMIT = 10;
export const DATA_NOT_FOUND = 'No Record Found';

export const ERROR_CODE_1 = 'Error: Authorization Expired, try login again .';
export const ERROR_CODE_2 = 'ERR_EXPIRED_AUTHORIZATION';
export const RESET_STORE = 'RESET_STORE';

export const SCREEN_SOLUTION = {
  MOBILE: '@media (min-width: 320px) and (max-width: 639px)',
  TABLET: '@media (min-width: 640px) and (max-width: 899px)',
  LAPTOP: '@media (min-width: 900px) and (max-width: 1199px)',
  DESKTOP: '@media (min-width: 1200px) and (max-width: 1599px)',
  LARGE_DESKTOP: '@media (min-width: 1600px)',
};

export const validEmail =
  /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.?)+\.[a-zA-Z]{2,}$/;
export const validPasswordMin8 = /^.{8,}$/;
export const validPassword =
  /^(?!.*[\s])(?=.*[a-z])(?=.*[A-Z])((?=.*[0-9])|(?=.*[!@#$%^&*]))(?=.{8,})/;
export const validPhoneNumber = /^[1-9]{1}[0-9]{9}/;
export const validContactNumber = /^[0-9()+\- ]*$/; //allow special characters like +, -, (, )
export const validNumber = /^[0-9]*[.]?[1-9]{0,2}$/;

export const ACCESS_TOKEN_KEY: any =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || EMPTY_STRING;
export const REFRESH_TOKEN_KEY: any =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || EMPTY_STRING;
// export const ACCESS_USER_META_KEY: any =
//   process.env.NEXT_PUBLIC_ACCESS_USER_META_KEY || EMPTY_STRING;

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const ORDER_TYPE = {
  ASC: 'asc',
  DESC: 'desc',
};
export const BUTTON_TYPE = {
  SUBMIT: 'submit',
  BUTTON: 'button',
  COLOR: 'link',
  PRIMARY: 'primary',
  DANGER: 'danger',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
};
export const BUTTON_VARIANT_TYPE = {
  CONTAINED: 'contained',
  OUTLINED: 'outlined',
};
export const DATE_FORMATE = {
  MM_DD_YYYY: 'MM-DD-YYYY',
  YYYY_MM_DD: 'YYYY-MM-DD',
  DD_MMMM_YYYY_h_mm: 'DD MMMM YYYY h:mm',
  MMMM_Do_YYYY: 'MMM Do YYYY',
  MMM_Do_YYYY_h_mm: 'MMM Do YYYY h:mm',
  MMM_D_YYYY: 'MMM D, YYYY',
};
export const TIME_FORMATE = {
  HH_MM_A: 'hh:mm A',
  HH_MM_SS: 'HH:mm:ss',
};
export const PAGINATION_TYPE = {
  PREVIOUS: 'PREVIOUS',
  NEXT: 'NEXT',
  SKIP: 'SKIP',
};

// '1' is for Covid record and certificate…
// '2' is for Activity Form…
// '3' is for Health Form…
// 'A' is for Reimbursement Form…
// '5' is for Covid Passport…
// '6' is for Company Welcome User Attachment…
// '7' is for My Plan in On Screen Shot Upload Image…
// '8' is for Import User Files…
// '9' is for Schedule Challenge in Import User Rejected Files…
// '10' is for Schedule Challenge in Import Mile Files…
// '11' is for Health Data Import Files…
// '12' is for Health Data Import Rejected, Created, and Updated Files…
// '13' is for Challenge Weight, Export, Rejected, Created, and Updated Files…
// '14' is for Challenge Recipe Image…
// '15' is for Document Download…
export const PRIVATE_BUCKET_IMAGE_TYPE = {
  COVID_RECORD: '1',
  ACTIVITY_FORM: '2',
  HEALTH_FORM: '3',
  REIMBURSEMENT_FORM: '4',
  COVID_PASSPORT: '5',
  COMPANY_WELCOME_USER_ATTACHMENT: '6',
  MY_PLAN_ON_SCREEN_SHOT_UPLOAD_IMAGE: '7',
  IMPORT_USER_FILES: '8',
  SCHEDULE_CHALLENGE_IMPORT_USER_REJECTED_FILES: '9',
  SCHEDULE_CHALLENGE_IMPORT_MILE_FILES: '10',
  HEALTH_DATA_IMPORT_FILES: '11',
  HEALTH_DATA_IMPORT_REJECTED_CREATED_UPDATED_FILES: '12',
  CHALLENGE_WEIGHT_EXPORT_REJECTED_CREATED_UPDATED_FILES: '13',
  CHALLENGE_RECIPE_IMAGE: '14',
  DOCUMENT: '15',
};

export const StepList = [
  { id: 'steps', value: 'Steps' },
  { id: 'meters', value: 'Meters' },
  { id: 'km', value: 'Kilometers' },
  { id: 'mile', value: 'Miles' },
  { id: 'yards', value: 'Yards' },
];
export const HrFormate = [
  { id: 'am', value: 'AM' },
  { id: 'pm', value: 'PM' },
];

export const GENDER_LIST = ['Male', 'Female', 'Other'];

export const GENDER_TYPE: any = {
  m: 'Male',
  f: 'Female',
  o: 'Other',
};

export const USER_ROLES: any = {
  ADMIN: 'ADMIN',
  GUARD: 'GUARD',
  OWNER: 'OWNER',
};
