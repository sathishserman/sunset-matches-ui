import { emailReducer  } from './emailReducer';
import { genderReducer } from './genderReducer';
import { nameReducer  } from './nameReducer';
import { phoneReducer  } from './phoneReducer';
import { verificationReducer  } from './verificationReducer';
import { heightReducer  } from './heightReducer';
import { combineReducers } from 'redux';
import { ageReducer } from './ageReducer';

export default combineReducers({
  emailState: emailReducer,
  nameState: nameReducer,
  phoneState: phoneReducer,
  verificationState: verificationReducer,
  genderState: genderReducer,
  heightState: heightReducer,
  ageState: ageReducer
});