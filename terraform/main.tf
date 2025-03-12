provider "aws" {
  region = var.aws_region
}

# S3 bucket for website hosting
resource "aws_s3_bucket" "website_bucket" {
  bucket = var.bucket_name
}

# Bucket ownership controls
resource "aws_s3_bucket_ownership_controls" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# Bucket Access control list
resource "aws_s3_bucket_acl" "website_bucket" {
  depends_on = [aws_s3_bucket_ownership_controls.website_bucket]
  bucket = aws_s3_bucket.website_bucket.id
  acl    = "public-read"
}

# Bucket public access block
resource "aws_s3_bucket_public_access_block" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# S3 bucket website configuration
resource "aws_s3_bucket_website_configuration" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id

  index_document {
    suffix = "index.html"
  }

}

# CloudFront Origin Access Identity (allows cloudfront to access S3)
resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for ${var.domain_name}"
}

# S3 bucket policy
resource "aws_s3_bucket_policy" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = "s3:GetObject"
        Effect   = "Allow"
        Resource = "${aws_s3_bucket.website_bucket.arn}/*"
        Principal = {
          AWS = "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${aws_cloudfront_origin_access_identity.oai.id}"
        }
      }
    ]
  })
}

# CloudFront distribution
resource "aws_cloudfront_distribution" "website_distribution" {
  origin {
    domain_name = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_id   = "S3-${var.bucket_name}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"  # Use only North America and Europe edge locations
  
  aliases = var.domain_name != "" ? [var.domain_name] : []

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.bucket_name}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {

    cloudfront_default_certificate = var.acm_certificate_arn == "" ? true : false
    minimum_protocol_version       = "TLSv1.2_2021"
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# Outputs
output "website_endpoint" {
  value = aws_s3_bucket_website_configuration.website_bucket.website_endpoint
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.website_distribution.domain_name
}

output "distribution_id" {
  value = aws_cloudfront_distribution.website_distribution.id
}