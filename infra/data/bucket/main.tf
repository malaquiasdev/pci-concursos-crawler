resource "aws_s3_bucket" "root" {
  bucket        = var.bucket_path
  force_destroy = var.force_destroy
}

resource "aws_s3_bucket_acl" "root_acl" {
  bucket = aws_s3_bucket.root.id
  acl    = "private"
}

resource "aws_s3_bucket_object" "lambda_functions" {
  bucket = aws_s3_bucket.root.id
  key    = "${var.bucket_path}-lambdas"
  source = var.lambdas_output_path
  etag   = filemd5(var.lambdas_output_path)
}
