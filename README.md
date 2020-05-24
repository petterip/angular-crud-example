# AngularCrudExample

The application demonstrates using Angular with Syncfusion making use of a Spring Boot REST API. The project highlights the basic features of Angular, using TypeScript and utilizing components and services according. The project is built upon a Syncfusion grid component making use of simple CRUD operations through a REST API. A special emphasis has been placed on reusability, maintanance and simple workflow. Hence instead of creating and updating an API service on the client side, the API methods have first been documented in detail with OpenAPI and Swagger, and then package `ng-openapi-gen` is used to generate the client-side service. Whenever the API gets updated, `npm run generate-api` may be run to regenerate the service raedy to be coupled with components.

As an UI framework, Angular Material and Syncfusion (with community license) were chosen as they have high maintainability and extensive user base. Syncfusion is also well documented and has a strong support for Angular.

In addition to API call implementations the application generates additional data by analysing an uploaded image with `ResembleJS`. The full-size image uploaded by user is compared against a static one and only the result is posted to the backend. This is to demonstrate the high performance and optimizations done by Angular 9 CLI, as tradiationally the analysis would be done in the backend.

## Live demo

The application has been deployed to Netlify, try it out here:

- <a href="https://app-angular-crud-example.netlify.app/" target="_blank">app-angular-crud-example.netlify.app</a>

Application makes use of backend, an instance deplyed to Heroku:

- <a href="https://patient-repository-api.herokuapp.com/" target="_blank">patient-repository-api.herokuapp.com</a>

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

### Generate the API service and set API URL

You may want switch between using a remote and locally deployed API. The API server needs to be running since the OpenAPI documentation is read as a JSON from `<host>/api-docs`.

Configure the application to use API server instance running remotely on Heroku:

```
$ npm run generate-api
```

Configure the application to use API running on localhost:

```
$ npm run generate-api-local
```

By default the application utlilizes API server instance deployed remotely. Alternatively you may deploy an instance locally by checking out [patient-repository-api](https://github.com/petterip/patient-repository-api). After deploying the API locally, change the application to connect on localhost by running `npm run generate-api-local`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Code style and documentation

Code quality is ensured by `tslint` with `codelyzer` for Angular 2 specific linting. [Typedoc](https://github.com/TypeStrong/typedoc) has been utilized in documenting the application.

## Licenses

- [MIT](/LICENSE)
- [3rd party licenses](/LICENSE_3rdparty) of the dependencies
