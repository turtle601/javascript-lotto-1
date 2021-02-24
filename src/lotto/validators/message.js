import validator from './validator.js';
import { MESSAGE } from '../../constants.js';

const message = {
  getCostValidation(cost) {
    if (validator.isMoneyLessThanMinCost(cost)) {
      return MESSAGE.SHOULD_EXCEED_MIN_COST;
    }
    if (validator.isChangeMoneyExist(cost)) {
      return MESSAGE.GET_SHOULD_NOT_HAVE_CHANGE_MESSAGE(cost);
    }

    return '';
  },

  getCorrectValidation(correctNumbers) {
    if (validator.isDuplicatedNumberExist(correctNumbers)) {
      return MESSAGE.DUPLICATED_NUMBER_EXIST_MESSAGE;
    }
    if (validator.isNumberOutOfRangeExist(correctNumbers)) {
      return MESSAGE.NUMBER_RANGE_EXCEEDED_MESSAGE;
    }

    return '';
  },
};

export default message;
