import { CfnOutput } from "aws-cdk-lib";
import {
  CognitoUserPoolsAuthorizer,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import {
  UserPool,
  UserPoolClient,
  CfnUserPoolGroup,
} from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class AuthorizerWrapper {
  private scope: Construct;
  private api: RestApi;

  private userPool: UserPool;
  private userPoolClient: UserPoolClient;
  public authorizer: CognitoUserPoolsAuthorizer;

  constructor(scope: Construct, api: RestApi) {
    this.scope = scope;
    this.api = api;

    this.initialize();
  }

  private initialize() {
    this.createUserPool();
    this.addUserPoolClient();
    this.createAuthorizer();

    
  }

  private createUserPool() {
    this.userPool = new UserPool(this.scope, "TalentUserPool", {
      userPoolName: "TalentUserPool",
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true,
      },
    });
    new CfnOutput(this.scope, "UserPoolId", {
      value: this.userPool.userPoolId,
    });
  }

  private addUserPoolClient() {
    this.userPoolClient = this.userPool.addClient("TalentUserPool-client", {
      userPoolClientName: "TalentUserPool-client",
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true,
      },
      generateSecret: false,
    });
    new CfnOutput(this.scope, "UserPoolClientId", {
      value: this.userPoolClient.userPoolClientId,
    });
  }

  private createAuthorizer() {
    this.authorizer = new CognitoUserPoolsAuthorizer(
      this.scope,
      "TalentUserAuthorizer",
      {
        cognitoUserPools: [this.userPool],
        authorizerName: "TalentUserAuthorizer",
        identitySource: "method.request.header.Authorization",
      }
    );
    this.authorizer._attachToApi(this.api);
  }


}
