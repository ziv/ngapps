export class DiceService {
  dices: number[] = [];

  addDice(size: number) {
    this.dices.push(size);
  }
}
