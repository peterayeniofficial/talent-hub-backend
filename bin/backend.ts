#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TalentStack } from '../lib/TalentStack';

const app = new cdk.App();
new TalentStack(app, 'TalentStack');
