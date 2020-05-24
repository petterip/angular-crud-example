# AngularCrudExample

The application demonstrates using Angular with Syncfusion making use of a Spring Boot REST API. The project highlights the basic features of Angular, using TypeScript and utilizing components and services according. The project is built upon a Syncfusion grid component making use of simple CRUD operations through a REST API. A special emphasis has been placed on reusability, maintanance and simple workflow. Hence instead of creating and updating an API service on the client side, the API methods have first been documented in detail with OpenAPI and Swagger, and then package `ng-openapi-gen` is used to generate the client-side service. Whenever the API gets updated, `npm run generate-api` may be run to regenerate the service raedy to be coupled with components.

As an UI framework, Angular Material and Syncfusion (with community license) were chosen as they have high maintainability and extensive user base. Syncfusion is also well documented and has a strong support for Angular.

In addition to API call implementations the application generates additional data by analysing an uploaded image with `ResembleJS`. The full-size image uploaded by user is compared against a static one and only the result is posted to the backend. This is to demonstrate the high performance and optimizations done by Angular 9 CLI, as tradiationally the analysis would be done in the backend.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6.

## Live demo

The application has been deployed to Netlify, try it out here:
https://app-angular-crud-example.netlify.app/

Application makes use of backend, an instance deplyed to Heroku:
https://patient-repository-api.herokuapp.com/

## Technology stack

### Core technologies

- [Angular 9](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [SyncFusion](https://www.syncfusion.com/products/communitylicense)
- [SASS](http://sass-lang.com/)

## Development server

To deploy the application locally:

```
$ npm install
$ ng serve
```

After staring the dev server, navigate to `http://localhost:4200/`.

By default the application utlilizes a backend deployed remotely. Alternatively you may deploy an instance locally by checking out [patient-repository-api](https://github.com/petterip/patient-repository-api). After deploying the API locally, change the application to connect on localhost by running `npm run generate-api-local`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Code style

Code quality is ensured by `tslint` with `codelyzer` for Angular specific linting.

### Bundling and packaging

- [webpack](https://webpack.github.io/)
- [npm](http://npmjs.com/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Medical Appointment Scheduling

[![Greenkeeper badge](https://badges.greenkeeper.io/sebastianhaas/medical-appointment-scheduling.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/sebastianhaas/medical-appointment-scheduling.svg?branch=master)](https://travis-ci.org/sebastianhaas/medical-appointment-scheduling)
[![Dependency Status](https://david-dm.org/sebastianhaas/medical-appointment-scheduling.svg)](https://david-dm.org/sebastianhaas/medical-appointment-scheduling)
[![Join the chat at https://gitter.im/sebastianhaas/medical-appointment-scheduling](https://badges.gitter.im/sebastianhaas/medical-appointment-scheduling.svg)](https://gitter.im/sebastianhaas/medical-appointment-scheduling?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Concept showcase for "Design of a Web-Based Appointment Scheduling System for Small and Medium-Sized Medical Facilities".

## Live showcase

An up-to-date snapshot of this repository is always available on [Heroku](https://scheduling-client.herokuapp.com).

> Due to the limitations of Heroku's free dynos and database service, it might take a while for the application to load initially. Also, there is a 10k row limit for free databases. Sometimes you might have to wipe test data other users created before being able to add new content. Test data can be inserted and deleted using the app-bar menu in the upper right corner.

## How to deploy

This application can be easily deployed to Heroku. tbd

## How to run locally

After checkout, run:

```
$ npm install
$ npm start
```

This requires node >=4 together with npm to be installed. This repository doesn't contain any backend, you need to have an instance of [medical-appointment-scheduling-server](https://github.com/sebastianhaas/medical-appointment-scheduling-server) running.

## Internationalization

Prepared for internationalization. The application is currently available in English and German. Translations are managed on POEditor.com in a [publicly available project](https://poeditor.com/projects/view?id=102821). The locale will be determined based on the user's browser settings and persisted to local storage. The logic can be found [here](https://github.com/sebastianhaas/medical-appointment-scheduling/blob/master/src/app/i18n-providers.ts#L47).

## Tests

Both unit and end-to-end tests do exist for most parts of the application.

### Unit tests

```
$ npm run test
```

### End-to-end tests

Make sure you have a running instance in another terminal before running end-to-end tests.

```
$ npm run e2e
```

## Code style and documentation

Code quality is ensured by `tslint` with `codelyzer` for Angular 2 specific linting. [Typedoc](https://github.com/TypeStrong/typedoc) has been utilized in documenting the application.

## Licenses

- [MIT](/LICENSE)
- [3rd party licenses](/LICENSE_3rdparty) of the dependencies
