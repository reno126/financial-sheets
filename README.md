# Financial-sheets
Presenting financial sheets based on external API data provided by free **polygon.io** services.
For now it presenst only two list of view as simple table data with some filters, columns setting and sorters.

## Live demo
You can visit https://financialsheets-reno126s-projects.vercel.app

## Motivation
The purpose of this project is to test the possibilities, advantages and disadvantages we have with **Next version 15**. I also wanted to find out about compatibility with the latest versions of **React Query** (now called TanStack Query).

I also demonstrate the advantages of decomposing the **client api** logic from the rest of the functionality.

I also checked out the new **client-server** build capabilities that the new Next gives us.

Although I am not a fan, in order not to waste time, I used the UI from Google - MUI.

## Tech overview

### Polygon API
Since Polygon offers us a REST API with simple authentication via api-key (anyone can generate one for themselves) I decided to execute all queries on the front-server side. Route /api/polygon handles GET request and serves as a proxy server. In this way, the front query no longer requires authorisation.

### Client API
For queries, I used the native fetch function (this fits best for TanStack). I packaged it with basic error throwing and passing capabilities.

For query building, I created a generic usePredefinedInfiniteQuery function. Polygon does not offer classic pagination, so I created a UI with infinite scroll.

This predefined function is used to implement the actual query - the retrieval of the resource.

**Thanks to the convenient functions of React Query, we have:**
- cache every query
- error handling
- data mapping - 'select'
- convenient support for the “load more” mechanism
- generic and fully type safe

### Expected errors 
Polygon offers a free API, but it severely limits the number of queries. Therefore, after only a few data downloads you will see a modal with an error message - too many requests.

### State in the URL
The new next handles search params quite differently. So I decided to demonstrate this by handling the state of queries and filters in the URL - hook useStateSearchParams.

### SSR
The new Next changes the approach to Server Side Render slightly. This can be seen through the specific “use client” statement. Server-side page generation works seamlessly.

### Possible extensions and improvements
- useTable hook currently renders a specific table. It could take tables as an argument with a specific interface
- other suggestions ... ?


## Getting Started

1. Clone the repository:
git clone

2. Install dependencies:
npm install

3. Set up environment variables:
Create a `.env` file in the root directory. See env.example for details.

4. Run the development server:
npm run dev