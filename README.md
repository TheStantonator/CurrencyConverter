# currency-converter

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## More Information

This is a project entirely around learning Vue from a React background. I'll go through each area and explaind the components involved. I'll also note potential improvements for the future given more time and familiarity with Vue.

The project uses Vue Router to navigate between Home and History views. VueX is also used in order to allow global management of the locally stored history.

### The Converter

The converter will take allow a user to select a "From" and a "To" currency then an amount to convert. Clicking a button wil then display the converted value using rates retrieved from FloatRates.com (which we'll called the API). Conversions are added to the history for later viewing.

## Converter.vue
This component contains all of the functionality for the Converter to work, effort was made to extrapolate elements into reusable components, however I could not get the model binding to work correctly so that was abandoned in favor of getting other functionality working.

### Initial Load
When the page first loads, a request is made to get the GBP rates from the API, this is mainly so that we can get a full list of available currencies to populate the dropdowns with. It also has the added benefit of preloading the GBP conversion rates for the first conversion, more on that in the next section.

### Conversions
When the user enters a valid value and hits the button, one of two things can happen:
- A call to the API will be made using the from currency to get all of the conversion rates for this currency. These rates are them stored in an object to be used later
- If the chosen "From" currency code matches the one from the previous conversion, no API call will be made and the rates will instead be retrieved from memory

With the rates retrieved, the rate for the selected target will be used to multiply the enetered amount. This will then be presented as the result. The conversion is then added to local storage.

#### Select.vue ####
This was my attempt at a reusable select component but I couldn't get the data binding with v-model to work. I've left it in as a proof of concept and left a commented out line at the top of Converter.vue

#### Future Improvements
- At the moment, only the previous rates are stored in memory. It would be good in the future to keep a log of rates used in local storage using VueX to archive them for the longer term, reducing the amount of API calls.

## HistoryTable.vue ##
The history table lists everything inside local storage. This data is loaded when the application is opened and is then subsequently maintained through the use of a VueX module inside the store when operations are made.

The table is by default sorted by id, which is a timestamp of when the record was created. Can be sorted by clicking on the table headers. This will mark the column header and sort the table by this column. Clicking them again will reverse the order.

The rows can also be removed from local storage here by clicking on the delete icon, clicking this removes them from both the store and local storage

#### Future Improvements
THe table could do with a few utility functions:
- A "Delete All" option that will clear the state in the store and call `localstorage.clear()`
- A reset sort button that will clear the searched column and reorder by the id
- Pagination for when the history gets too large.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
