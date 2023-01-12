data "archive_file" "archive" {
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
  lambdas_output_path = data.archive_file.archive.output_path
  force_destroy       = false
}
