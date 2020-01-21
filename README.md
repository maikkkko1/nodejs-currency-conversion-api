### Currency conversion API - Exchange rates are based on current foreign exchange rates published by the European Central Bank.

#### What has been used:
* Node.js
* Express
* Jest

##### Getting started

Clone the repository and then Install the dependencies.

```
npm install
```

Run the tests to see if everything is fine, there is currently 4 tests and all should pass.

```
npm test
```

###### The exchange rates are based on information that the European Central Bank provides everyday.

The params are from-to currency and the amount to convert.

Example below, converting from USD to BRL the amount of 25.00 (the value is based on the exchange rates from the day the request was made).

```
GET /api/v1/conversion?from=usd&to=brl&amount=25.00
```

Response

```
{
    "error": null,
    "result": {
        "from": "USD",
        "to": "BRL",
        "amount_to_convert": 25,
        "amount_converted": 104.55570591
    }
}
```
