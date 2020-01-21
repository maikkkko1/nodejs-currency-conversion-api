/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2020-01-21 10:33:01
 * @modify date 2020-01-21 10:33:01
 * @desc Conversion controller.
 */

const Request = require("../Request");
const httpRequest = require("request");

exports.conversion = async (req, res) => {
  const params = req.query;

  const conversion = await this.doConversion(params);

  res.send(conversion);
};

exports.doConversion = async params => {
  if (this.invalidParams(params)) {
    return Request.response("Invalid params.", true);
  }

  const ratesObj = await this.getRates(params.from);

  if (ratesObj.error) {
    return Request.response(ratesObj.error, true);
  }

  if (!ratesObj.rates.hasOwnProperty(params.to.toUpperCase())) {
    return Request.response(
      params.to.toUpperCase() + " isn't supported.",
      true
    );
  }

  const converted = this.convert(params, ratesObj.rates);

  return Request.response({
    from: params.from.toUpperCase(),
    to: params.to.toUpperCase(),
    amount_to_convert: Number(params.amount.replace(",", ".")),
    amount_converted: converted
  });
};

exports.convert = (params, rates) => {
  const rate = rates[params.to.toUpperCase()];
  const amount = params.amount;

  return amount.replace(",", ".") * rate;
};

exports.getRates = async base => {
  return new Promise((resolve, reject) => {
    httpRequest(
      "https://api.exchangeratesapi.io/latest?base=" + base.toUpperCase(),
      (error, response, body) => {
        if (error) {
          reject(JSON.parse(error));
        } else {
          resolve(JSON.parse(body));
        }
      }
    );
  });
};

exports.invalidParams = params => {
  return !params.from || !params.to || !params.amount;
};
