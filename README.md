# AngularCrudExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6.

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

## Code style

Code quality is ensured by `tslint` with `codelyzer` for Angular 2 specific linting.

## Technology stack

### Core technologies

- [Angular 9](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [SyncFusion](https://www.syncfusion.com/products/communitylicense)
- [SASS](http://sass-lang.com/)

### Bundling and packaging

- [webpack](https://webpack.github.io/)
- [npm](http://npmjs.com/)

### Testing

- [Karma](https://karma-runner.github.io/1.0/index.html)
- [Jasmine](http://jasmine.github.io/)
- [Protractor](http://www.protractortest.org/)
- [Selenium](http://docs.seleniumhq.org/)

### Code style

- [codelyzer](https://github.com/mgechev/codelyzer)
- [tslint](https://palantir.github.io/tslint/)

### Documentation

- [Typedoc](https://github.com/TypeStrong/typedoc)

## License

[MIT](/LICENSE)
