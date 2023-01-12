data "archive_file" "position_offer" {
  type        = "zip"
  output_path = "files/functions.zip"
  source_dir  = "../${path.module}/"
  excludes    = setunion(
    ["package.json", "package-lock.json","README.md", ".eslintrc",
    ".editorconfig", ".eslintignore", ".gitignore", ".prettierrc",
    "jest.config.js", "tsconfig.json"],
    fileset("../${path.module}/", "src/**"),
    fileset("../${path.module}/", "infra/**"),
    fileset("../${path.module}/", "infra/files/functions.zip"),
  )
}

module "bucket" {
  source              = "./data/bucket"
  bucket_path         = "${var.project_name}-e32e9f6a"
  lambdas_output_path = data.archive_file.position_offer.output_path
  force_destroy       = false
}


module "position-offer-lambda" {
  depends_on = [
    module.bucket
  ]
  source           = "./functions/position-offer"
  project_name     = var.project_name
  bucket_path      = "${var.project_name}-e32e9f6a"
  s3_bucket_id     = module.bucket.s3_bucket_id
  s3_bucket_key    = module.bucket.s3_bucket_key
  source_code_hash = data.archive_file.position_offer.output_base64sha256
}