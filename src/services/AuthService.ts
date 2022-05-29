import { CognitoUser } from "@aws-amplify/auth";
import { Auth, Amplify } from "aws-amplify"
import * as AWS from "aws-sdk";
import { Credentials } from "aws-sdk/lib/credentials";
import { config } from "./config";
import { User, UserAttribute } from "../model/Model";

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.REGION,
    userPoolId: config.USER_POOL_ID,
    userPoolWebClientId: config.APP_CLIENT_ID,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  }
});


export class AuthService {
  public async login(userName: string, password: string): Promise<User | undefined> {
    try {
      const user = await Auth.signIn(userName, password) as CognitoUser;
      return {
        cognitoUser: user,
        userName: user.getUsername(),
      };
    } catch (error) {
      return undefined;
    }
  }

  public async getAWSTemporaryCreds(user: CognitoUser) {
    const cognitoIdentityPool = `cognito-idp.${config.REGION}.amazonaws.com/${config.USER_POOL_ID}`;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: config.INDENTITY_POOL_ID,
      Logins: {
        [cognitoIdentityPool]: user.getSignInUserSession()!.getIdToken().getJwtToken()
      }
    }, {
      region: config.REGION,
    })
    await this.refreshCredentials();
  }

  private async refreshCredentials() {
    return new Promise((resolve, reject) => {
      (AWS.config.credentials as Credentials).refresh(err => {
        if (err) {
          reject(err)
        } else {
          resolve('resolved')
        }
      })
    })
  }

  public async getUserAttributes(user: User): Promise<UserAttribute[]> {
    const result: UserAttribute[] = [];
    const attributes = await Auth.userAttributes(user.cognitoUser);
    result.push(...attributes);
    return result;
  }
}
