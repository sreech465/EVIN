import {combineReducers} from 'redux';
import {ProcessAndEquipmentReducer} from './EquipmentAndProcess/reducer';
import {EquipmentDetailsReducer} from './EquipmentDetail/reducer';
import {ProjectDetailReducer} from './ProjectDetail/reducer';

import {LoginReducer} from './login_credentials/reducer';
import {ProjectListReducer} from './ProjectList/reducer';
import { MntChkReducer } from './MntChckLst/reducer';
import { ProcessLoad } from './Load_More/reducer';
import { ProcessDetailsReducer } from './ProcessDetail/reducer';

export const singleReducer = combineReducers({
  LoginReducer: LoginReducer,
  ProcessAndEquipmentReducer: ProcessAndEquipmentReducer,
  EquipmentDetails: EquipmentDetailsReducer,
  ProjectListReducer:ProjectListReducer,
  MntChkReducer:MntChkReducer,
  ProjectDetailReducer:ProjectDetailReducer,
ProcessDetails:ProcessDetailsReducer

 
});
