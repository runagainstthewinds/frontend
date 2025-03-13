provider "aws" {
  region = "us-east-1"
}

# Use data source for existing S3 bucket
data "aws_s3_bucket" "website_bucket" {
  bucket = "studytgt-s3-cdn-live"
}

# Use data source for existing CloudFront distribution
data "aws_cloudfront_distribution" "existing_distribution" {
  id = "E3W4QGN8ABZX4F" 
}



output "distribution_id" {
  value = data.aws_cloudfront_distribution.existing_distribution.id
}

output "cloudfront_domain_name" {
  value = data.aws_cloudfront_distribution.existing_distribution.domain_name
}