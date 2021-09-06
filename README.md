Copyright (c) 2021, Peaq Technology GmbH
# peaq Access Progressive Web APP

Next.js React App


## Authors

<table style="text-align: center; border-width: 0;">
  <tr>
   <td>Yaroslav Strukevych
   </td>
   <td>Alina Zorilo<br/>
   </td>	  
</tr>
</table>

## Requirements

Node.js v12.7+, NPM v6.0+, Docker

This APP uses git submodules, to clone it use:
```
git clone --recurse-submodules https://github.com/peaqio/access-pwa.git
```
or clone and
```
git submodule init
git submodule update --remote
```
## Setup and run

```
npm install
npm run dev
```

## Setup and run production

```
npm run build:docker
npm run start:docker
```
