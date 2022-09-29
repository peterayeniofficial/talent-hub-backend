import { Policies } from './Policies';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {AuthorizationType, LambdaIntegration, MethodOptions, RestApi} from 'aws-cdk-lib/aws-apigateway'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import {AuthorizerWrapper} from './auth/AuthorizerWrapper'
import { GenericTAble } from './GenericTable';
import { join } from 'path';
export class TalentStack extends Stack {

  private api = new RestApi(this, 'TalentAPI')
  private authorizer: AuthorizerWrapper
  private policies: Policies

  private talentHubTable = new GenericTAble(this, {
    tableName: 'TalentHubTable',
    primaryKey: 'talentId',
    createLambdaPath: 'Create',
    readLambdaPath: 'Read',
    updateLambdaPath: 'Update',
    deleteLambdaPath: 'Delete',
    secondaryIndexes: ['location']
  })

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.authorizer = new AuthorizerWrapper(this, this.api, this.policies)

    const hello = new NodejsFunction(this, 'HelloHandler',{
      entry: (join(__dirname, '../','services', 'hello.ts')),
      handler: 'hello'
    })

    const optionsWithAuthorizer: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: this.authorizer.authorizer.authorizerId
      }
    }

    // Hello Api lambda integration
    const helloLambdaIntegration = new LambdaIntegration(hello)
    const helloLambdaResource = this.api.root.addResource('hello')
    helloLambdaResource.addMethod('GET', helloLambdaIntegration, optionsWithAuthorizer)

    //Talent Hub API Integrations
    const talentResource = this.api.root.addResource('talents')
    talentResource.addMethod('POST', this.talentHubTable.createLambdaIntegration)
    talentResource.addMethod('Get', this.talentHubTable.readLambdaIntegration)
    talentResource.addMethod('PUT', this.talentHubTable.updateLambdaIntegration)
    talentResource.addMethod('DELETE', this.talentHubTable.deleteLambdaIntegration)
    
  }
}
