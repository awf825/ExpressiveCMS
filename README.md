# ExpressiveCMS
## Nuts & Bolts
### Getting Started
1) Run MAMP on machine. Use localhost:8888/phpmyadmin for interacting with data.
2) For local dev ( host=localhost user=user password=password port=8889 database=expressive-cms ).
3) Run both 'yarn workspace Server start' (*localhost:3200*) and 'yarn workspace client start' (*localhost:3000*) from root of monorepo. You can run 'yarn start' to run concurrently, but this won't allow you to see dev logs from nodemon.

## Journal
### Initial Dev
#### 4/21/2022
    Made successful connection to mysql db in /Server and served it to /client.
    Built out react-router v6: 
        GOOD RESOURCE for nested cms style routing: https://v5.reactrouter.com/web/guides/quick-start
        V6 specific: https://reactrouter.com/docs/en/v6/upgrading/v5




