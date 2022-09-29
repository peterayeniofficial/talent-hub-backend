#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TalentHubStack } from '../lib/TalentHubStack';

const app = new cdk.App();
new TalentHubStack(app, 'TalentHubStack');
