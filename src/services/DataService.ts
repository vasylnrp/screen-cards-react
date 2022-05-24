import { Card } from "../model/Model";

export class DataService {
  async getCards(): Promise<Card[]> {
    const result: Card[] = [];
    result.push({
      cardId: '123',
      name: 'interesting',
    });
    result.push({
      cardId: '124',
      name: 'super',
    });
    result.push({
      cardId: '125',
      name: 'useful',
    });
    return result;
  }
}
