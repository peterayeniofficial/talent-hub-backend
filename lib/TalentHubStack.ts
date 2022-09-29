import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda  from 'aws-cdk-lib/aws-lambda'
import { Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {LambdaIntegration, RestApi} from 'aws-cdk-lib/aws-apigateway'

import { GenericTAble } from './GenericTable';

export class TalentHubStack extends Stack {

  private api = new RestApi(this, 'TalentHubAPI')
  private talentHubTable = new GenericTAble('TalentHubTable','talentId', this)

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const hello = new lambda.Function(this, 'HelloHandler',{
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('services'),
      handler: 'hello.handler'
    })

    // Hello Api lambda integration
    const helloLambdaIntegration = new LambdaIntegration(hello)
    const helloLambdaResource = this.api.root.addResource('hello')
    helloLambdaResource.addMethod('GET', helloLambdaIntegration)

    
  }
}
