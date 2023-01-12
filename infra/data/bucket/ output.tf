output "s3_bucket_id" {
  value = aws_s3_bucket.root.id
}

output "s3_bucket_key" {
  value = aws_s3_bucket_object.lambda_functions.key
}
