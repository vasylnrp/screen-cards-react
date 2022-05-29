import { ICreateCardState } from "../components/cards/CreateCard";
import { Card } from "../model/Model";
import { config, S3 } from 'aws-sdk';
import { config as appConfig } from './config'

config.update({
  region: appConfig.REGION
})

export class DataService {

  public async createCard(iCreateCard: ICreateCardState) {
    if (iCreateCard.photo) {
      const photoUrl = await this.uploadPublicFile(
        iCreateCard.photo,
        appConfig.CARDS_PHOTO_BUCKET,
      );
      console.log(photoUrl);
      iCreateCard.photoURL = photoUrl;
      iCreateCard.photo = undefined;
    }
    return '123'
  }

  private async uploadPublicFile(file: File, bucket: string) {
    const fileName = file.name;
    const uploadResult = await new S3({region: appConfig.REGION}).upload({
      Bucket: bucket,
      Key: fileName,
      Body: file,
      ACL: 'public-read'
    }).promise();
    return uploadResult.Location;
  }

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

  public async changeCard(cardId: string): Promise<string | undefined> {
    if (cardId === '123') {
      return ('5555');
    } else {
      return undefined;
    }
  }
}
