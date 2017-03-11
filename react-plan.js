//Store
{
  user: {
    email: 'payamabedi@gmail.com',
    seller: true,
    isFetching: true
  },
  listings: {
    isFetching: true,
    items: [],
    lastUpdated: 'ISO TIME DATE'
  },
  transactions: {
    isFetching: true,
    items: [],
    lastUpdated: 'ISO TIME DATE'
  },
  favorites: {}
}

// Components
FilterableWatchListing
Search Bar



// Containers
App
 - Header
   * Search Bar
 - FilterableWatchListing
   * WatchListing
 - Footer

// Actions


// Reducers

// Authentication
 - Hit accounts page and pop login modal
 - make requst for modal with username / password / granttype (twitter, instagram) etc..
 - sets cookie with jwt token
 - sets csrf token
 - every request includes that cookie and the header for csrf token
(Make user request on hard reload, but within single page app, do not need to make request for user again)

// Authenticated Pages
 - checkout
 - accounts
 - create listing