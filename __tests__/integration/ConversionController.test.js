/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2020-01-21 11:44:37
 * @modify date 2020-01-21 11:44:37
 * @desc Tests for ConversionController
 */

const request = require("supertest");
const app = require("../../src/app");

describe("ConversionController tests", () => {
  it("Should return with success the amount converted and other informations", async () => {
    const response = await request(app).get(
      "/api/v1/conversion?from=usd&to=brl&amount=28,50"
    );

    expect(response.body.result).toEqual(
      expect.objectContaining({
        from: expect.any(String),
        to: expect.any(String),
        amount_to_convert: expect.any(Number),
        amount_converted: expect.any(Number)
      })
    );
  });

  it("Should return invalid params exception", async () => {
    const response = await request(app).get(
      "/api/v1/conversion?from=usd&to=brl&"
    );

    expect(response.body.error).toEqual("Invalid params.");
  });

  it("Should return not supported currency to convert from", async () => {
    const response = await request(app).get(
      "/api/v1/conversion?from=usdddd&to=brl&amount=28,50"
    );

    expect(response.body.error).toEqual("Base 'USDDDD' is not supported.");
  });

  it("Should return not supported currency to convert", async () => {
    const response = await request(app).get(
      "/api/v1/conversion?from=usd&to=brrrl&amount=28,50"
    );

    expect(response.body.error).toEqual("BRRRL isn't supported.");
  });
});
