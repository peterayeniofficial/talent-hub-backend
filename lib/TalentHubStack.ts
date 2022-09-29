import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda  from 'aws-cdk-lib/aws-lambda'
import { Runtime, Code } from 'aws-cdk-lib/aws-lambda';

export class TalentHubStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const hello = new lambda.Function(this, 'HelloHandler',{
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('services'),
      handler: 'hello.handler'
    })
  }
}
