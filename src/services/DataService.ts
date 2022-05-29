import { ICreateCardState } from "../components/cards/CreateCard";
import { Card, User } from "../model/Model";
import { config, S3 } from 'aws-sdk';
import { config as appConfig } from './config'
import { generateRandomId } from "../utils/Utils";

config.update({
  region: appConfig.REGION
})

export class DataService {

  private user: User | undefined;

  public setUser(user: User) {
    this.user = user;
  }

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
    const requestUrl = appConfig.api.cardsUrl;
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Authorization': this.getUserIdToken(),
      },
      body: JSON.stringify({
        ...iCreateCard,
        user: this.user?.userName,
      }),
    }
    const result = await fetch(requestUrl, requestOptions);
    const resultJSON = await result.json();

    return JSON.stringify(resultJSON.id);
  }

  private async uploadPublicFile(file: File, bucket: string) {
    const fileName = generateRandomId() + file.name;
    const uploadResult = await new S3({region: appConfig.REGION}).upload({
      Bucket: bucket,
      Key: fileName,
      Body: file,
      ACL: 'public-read'
    }).promise();
    return uploadResult.Location;
  }

  private getUserIdToken(): string {
    return this.user ? this.user.cognitoUser.getSignInUserSession()!.getIdToken().getJwtToken() : '';
  }

  async getCards(): Promise<Card[]> {
    if (!this.user) {
      return [];
    }

    const requestUrl = appConfig.api.cardsUrl
    const requestResult = await fetch(
      requestUrl, {
        method: 'GET',
        headers: {
          'Authorization': this.getUserIdToken(),
        }
      }
    )

    const responseJSON = await requestResult.json();
    return responseJSON.Items;
  }

  public async changeCard(cardId: string): Promise<string | undefined> {
    if (cardId === '123') {
      return ('5555');
    } else {
      return undefined;
    }
  }
}
