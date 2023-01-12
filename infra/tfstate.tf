terraform {
  backend "s3" {
    bucket  = "pci-concursos-crawler-e32e9f6a"
    key     = "terraform/pci-concursos-crawler.tfstate"
    region  = "sa-east-1"
    profile = "default"
  }
}