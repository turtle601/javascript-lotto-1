import Console from '../utils/Console';

const InputView = {
  readPurchasePrice() {
    return Console.readline('구입금액을 입력해 주세요. ');
  },
  readWinningNumbers() {
    return Console.readline('당첨 번호를 입력해 주세요. ');
  },
  readBonusNumber() {
    return Console.readline('보너스 번호를 입력해 주세요. ');
  },
  readRestart() {
    return Console.readline('다시 시작하시겠습니까? (y/n) ');
  },
};

export default InputView;
