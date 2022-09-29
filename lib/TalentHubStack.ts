import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {LambdaIntegration, RestApi} from 'aws-cdk-lib/aws-apigateway'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

import { GenericTAble } from './GenericTable';
import { join } from 'path';
export class TalentHubStack extends Stack {

  private api = new RestApi(this, 'TalentHubAPI')
  private talentHubTable = new GenericTAble('TalentHubTable','talentId', this)

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const hello = new NodejsFunction(this, 'HelloHandler',{
      entry: (join(__dirname, '../','services', 'hello.ts')),
      handler: 'hello'
    })

    // Hello Api lambda integration
    const helloLambdaIntegration = new LambdaIntegration(hello)
    const helloLambdaResource = this.api.root.addResource('hello')
    helloLambdaResource.addMethod('GET', helloLambdaIntegration)

    
  }
}
