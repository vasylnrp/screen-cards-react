const cardsUrl = 'https://918chlxk51.execute-api.eu-central-1.amazonaws.com/prod';

export const config = {
  REGION: 'eu-central-1',
  USER_POOL_ID: 'eu-central-1_vXDGAA5AZ',
  APP_CLIENT_ID: '26sdltjdvliiq5qojk9t358mbq',
  INDENTITY_POOL_ID: 'eu-central-1:909c4990-b933-4377-8b6a-1cb07eea35e4',
  CARDS_PHOTO_BUCKET: 'cards-photos-0a4697b679d2',
  api: {
    baseUrl: cardsUrl,
    cardsUrl: `${cardsUrl}/cards`
  }
}
