# Jeans Retailer

Jeans retailer is an application created by Michel Temmerman for an interview with Credit Suisse as a Senior front-end developer.
The app demonstrates knowledge of front-end technologies.
It can be used to analyse the most popular orders from the last year.

## Requirements
You only need `npm` to run the application. When the application starts it will download all its own dependencies.

## Installation
Unzip the current file onto your hard-drive.

## Usage
`cd jeans-retailer`  
`npm install`  
`npm start`  
Visit `http://localhost:3000`

To run tests (you must run npm install & npm start at least once before):
`npm test`

To see the extensive unit-test coverage (close to 100%):
`npm test -- --coverage` (Note the -- --!)

To run the end-2-end test suite:  
`npm run e2e`  

To run a production build (minified, etc...):
`npm run build`

To detach from react-create-app:
`npm run eject`


## Features
- When the application loads it displays 1000 rows of order data from a fake database.  
It shows the data ungrouped and `No filter` is selected `(url: /)`  
- When the user selects a 1st filter, all the records are then grouped by the field in the filter.  
A total of all orders in the group is shown on the right hand side and the groups are ordered in a descending order from the most popular to least popular.  
At the top of the page, you will see a __tag cloud__ representing visually the biggest 30 groups from the list below. `(url: /filter/deliveryCountry)`  
eg: selecting `deliveryCountry` would group all these records by their deliveryCountry and puts China at the top with 7790 orders  
- When the user selects a 2nd filter, all the groups are sub-divided into a second level.  
Each sub-total shows the total number of orders inside on the right.  
The __tag cloud__ now includes the 30 biggest sub-groups picked from all the groups. `(url: /filter/size/and/gender)`  
eg: selecting `size` and then `gender` would give you a breakdown of the sizes and how many orders from each gender in each size.  
- Clicking on the header for the single group when showing one level or on the header of the second group with show the records inside.  
- The __tag cloud__ can be hidden by clicking on the `Hide Tags...` button  
- Clicking on a tag in the __tag cloud__ for now only shows information about the group.  

## Assumptions
create-react-app is accepted as a dependency to generate the app skeleton  
node-sass is ok  
react is ok as a UI library  
custom css is prefered to React-Bootstrap  
included a reset stylesheet  
No tables  
All javascript is ES6 and airbnb compliant, passing eslint without warnings  
tdd is important  
maximum test coverage is important  
exact versioning in package.json  
Framework would bloat the application, restrict to the minimum  
Close to 100% code coverage  

## With more time...
I would have done even better components, single responsibility. DataViewer is starting to be a little crowded.  
Nicer UI design  
Better mocks and stubs in tests where data would be fetched  
Better css naming convention  
Better lifecycle management, unmounting etc  
Pagination of data  
Better error handling  
Animations  
Nodejs environmentally aware with foreman  
