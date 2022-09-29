import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class Policies {
  private talentPhotosBucket: Bucket;
  private profilePhotosBucket: Bucket;
  public uploadTalentPhotos: PolicyStatement;
  public uploadProfilePhoto: PolicyStatement;

  constructor(talentPhotosBucket: Bucket, profilePhotosBucket: Bucket) {
    this.talentPhotosBucket = talentPhotosBucket;
    this.profilePhotosBucket = profilePhotosBucket;
    this.initialize();
  }

  private initialize() {
    this.uploadTalentPhotos = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:PutObject", "s3:PutObjectAcl"],
      resources: [this.talentPhotosBucket.bucketArn + "/*"],
    });
    this.uploadProfilePhoto = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:PutObject", "s3:PutObjectAcl"],
      resources: [this.profilePhotosBucket.bucketArn + "/*"],
    });
  }
}
