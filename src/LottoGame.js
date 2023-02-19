const LottoMachine = require('./domain/LottoMachine');
const WinningNumbers = require('./domain/WinningNumbers');
const BonusNumber = require('./domain/BonusNumber');
const LottoStatistics = require('./domain/LottoStatistics');
const CorrectLotto = require('./domain/CorrectLotto');

const InputView = require('./view/InputView');
const OutputView = require('./view/OutputView');

const { errorCheckFor } = require('./utils/errorCheckFor');

class LottoGame {
  #lottoMachine;

  #correctLotto;

  constructor() {
    this.#lottoMachine = new LottoMachine();
    this.#correctLotto = new CorrectLotto();
  }

  async successPayForLottoEvent() {
    this.#lottoMachine.purchase(await InputView.readPurchasePrice());
    OutputView.printPurchasedLottos(this.#lottoMachine.lottos);

    this.inputWinningNumbers();
  }

  payForLotto() {
    errorCheckFor(
      () => this.successPayForLottoEvent(),
      () => this.payForLotto()
    );
  }

  async successInputWinningNumbersEvent() {
    this.#correctLotto.setWinningNumbers(
      new WinningNumbers(await InputView.readWinningNumbers())
    );

    this.inputBonusNumber();
  }

  inputWinningNumbers() {
    errorCheckFor(
      () => this.successInputWinningNumbersEvent(),
      () => this.inputWinningNumbers()
    );
  }

  async successInputBonusEvent() {
    const bonus = new BonusNumber(await InputView.readBonusNumber());

    this.#correctLotto.setBonusNumber(bonus);
    this.#correctLotto.validateLottos();

    this.showLottoStatistics();
    this.inputRestartQuitCommand();
  }

  inputBonusNumber() {
    errorCheckFor(
      () => this.successInputBonusEvent(),
      () => this.inputBonusNumber()
    );
  }

  showLottoStatistics() {
    const { lottos, price } = this.#lottoMachine;
    const statics = new LottoStatistics(this.#correctLotto);

    const winningResult = statics.getAllLottosRank(lottos);
    const profitRate = statics.getProfitRate(winningResult, price);

    OutputView.printStatistics(winningResult, profitRate);
  }

  async successInputRestartQuitCommand() {
    const command = (await InputView.readRestart()).toLowerCase();

    this.validateCommand(command);
    this.executeCommand(command);
  }

  inputRestartQuitCommand() {
    errorCheckFor(
      () => this.successInputRestartQuitCommand(),
      () => this.inputRestartQuitCommand()
    );
  }

  validateCommand(command) {
    if (!this.isValidCommand(command)) {
      throw new Error(
        '[ERROR] 올바른 명령어가 아닙니다. 재시작(y) / 종료(n)을 입력해 주세요.'
      );
    }
  }

  isValidCommand(command) {
    return ['y', 'n'].includes(command.toLowerCase());
  }

  executeCommand(command) {
    if (command === 'y') {
      this.restart();
    }

    if (command === 'n') {
      OutputView.quit();
    }
  }

  restart() {
    this.payForLotto();
  }
}

module.exports = LottoGame;
