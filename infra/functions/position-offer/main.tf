resource "aws_lambda_function" "position-offer-lambda" {
  description      = "PCI vagas page crawler"
  function_name    = "${var.project_name}-position-offer-crawler"
  handler          = "./dist/functions/position-offer/index.handler"
  runtime          = "nodejs14.x" // do not update this aws-chrome-lambda needs this version
  timeout          = 600
  memory_size      = 2048
  s3_bucket        = var.s3_bucket_id
  s3_key           = var.s3_bucket_key
  source_code_hash = var.source_code_hash
  role             = aws_iam_role.position-offer-crawler.arn
  environment {
    variables = {
      bucketPath = var.bucket_path
    }
  }
}