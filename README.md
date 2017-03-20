# Trainwreck (new_train)
A simpler interface for the Israel train schedules API written in AngularJS as seen live @ http://train.inj.space

## Installation
**Prerequisite: Node.js**

**Prerequisite: jspm CLI (beta release)**
```
$ npm install -g jspm@beta
```
**Clone and start**
```
$ git clone https://github.com/omertuc/new_train.git
$ npm start
```
**Note:** The npm start script is configured to install all dependencies automatically.

## Building
new_train isn't bundled (minified & mangled) out-of-the-box so if you did simply start it after clone it'll run without a bundle. We mainly use bundles (hence the build) in production to serve lighter files to the client.

**Full Build**
Bundles both assets and dependencies as seen below
```
$ npm run build
```
**Assets Bundle**
Bundles the components, services and views used by the interface
```
$ npm run bundle
```
**Assets Bundle Watcher (dev mode)**
Runs a watcher that bundles automatically when files are updated (assets only)
```
$ npm run bundle-watch
```
**Depdendencies Bundle**
Bundles the dependencies installed via jspm
```
$ npm run bundle-deps
```
**Remove a Bundle**
Removes a bundle for development purposes (if you don't like the live watcher) or so
```
$ npm run unbundle
```
