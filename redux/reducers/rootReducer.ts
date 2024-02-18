import { emailReducer  } from './emailReducer';
import { nameReducer  } from './nameReducer';
import { phoneReducer  } from './phoneReducer';
import { verificationReducer  } from './verificationReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  emailState: emailReducer,
  nameState: nameReducer,
  phoneState: phoneReducer,
  verificationState: verificationReducer

});