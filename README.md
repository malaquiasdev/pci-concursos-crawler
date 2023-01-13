# PCI Concursos Crawler

This is a small project to study how to use puppeteer and crawler pages with that.

At this project I am doing scrapy in the http://pciconcursos.com.br/vagas/{position} page and collect the future jobs positions offers and save it as CSV file localy or into a bucket s3.

## Setup Local 🖥️

### Prerequisites 📝

Before you begin, ensure you have met the following requirements:

- You must have an AWS Credentials
- Configure the [AWS CLI](https://aws.amazon.com/pt/cli/)
- You have installed the [Node.js](https://nodejs.org/en/)
- You have installed the [Terraform](https://www.terraform.io)

### Create the infra on AWS 🏗️

```
cd infra && terraform init && terraform terraform apply -auto-approve
```

#### Install dependencies 🚀

```sh
$ npm install
```

### Run project

```sh
$ npx ts-node src/functions/position-offer/local.ts
```

## Testing

## To know more

- [About](https://thepixardb.malaquias.dev/about/)
- [Features list]()

## Terms of Use

1. Free for non-commercial use.
2. You can make use of the API as data service.
3. ‘Hoarding’ or mass collection of data from this API is strictly prohibited.

## Legal Notice

We do not claim ownership of any of the images or data in the API. We comply with the Digital Millennium Copyright Act (DMCA) and expeditiously remove infringing content when properly notified. Any data and/or images you upload you expressly grant us a license to use. You are prohibited from using the images and/or data in connection with libelous, defamatory, obscene, pornographic, abusive or otherwise offensive content.

## How to contribute

Go to [contribute](.github/CONTRIBUTING.md)

## License

[![LICENSE](https://img.shields.io/badge/License-MIT_2.0-brightgreen.svg?style=for-the-badge&logo=bookstack&logoColor=white)](/LICENSE)
