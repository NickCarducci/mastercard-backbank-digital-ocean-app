require("dotenv").config();
const fetch = require("node-fetch");
const oauth = require("mastercard-oauth1-signer");
const express = require("express");

const app = express();
const port = 8080;
//http://johnzhang.io/options-request-in-express
//var origin = req.get('origin');
var allowedOrigins = [
  "https://sausage.saltbank.org",
  "https://i7l8qe.csb.app",
  "https://vau.money",
  "https://jwi5k.csb.app"
];

const serializeHeader = (
  uri,
  method,
  body = {
    pageOffset: "1",
    pageLength: "10",
    postalCode: "07704"
  }
) => {
  var payload = "";
  //Object.keys(body)[0] === "pageOffset" && "GET"
  if (method === "GET")
    payload =
      "?" +
      Object.keys(body).map(
        (x, i) =>
          x + "=" + body[x] + (i !== Object.keys(body).length - 1 ? "&" : "")
      );
  var signingKey = process.env.p12; //oauthRSASHAPKCS1.p12;
  signingKey = signingKey
    .split("-----BEGIN RSA PRIVATE KEY-----")[1]
    .split("-----END RSA PRIVATE KEY-----")[0];
  signingKey =
    "-----BEGIN RSA PRIVATE KEY-----" +
    signingKey.replace(/ /g, `\n`) +
    "-----END RSA PRIVATE KEY-----";
  payload = payload.replace(/,/g, "");
  return {
    body,
    payload,
    authHeader: oauth.getAuthorizationHeader(
      uri + payload,
      method,
      body,
      process.env.consumerKey, //oauthRSASHAPKCS1.consumerKey,
      signingKey //fs.readFileSync("src/Passwordlike-sandbox.p12", 'binary')
    )
  }; //Buffer.from(,'utf8)
};
app
  .get("/", (req, res) => res.status(200).send("shove it"))
  .get("/logs", (req, res) => {
    fetch(`https://api.digitalocean.com/v2/apps/${
      app_id
      }/deployments/${
      deployment_id
      }/components/${
      component_name
      }/logs`)
      //https://docs.digitalocean.com/reference/api/api-reference/#operation/apps_get_logs
      .then(async res => await res.json())
      .then(result => {
        res.redirect(301, `${result.live_url}`);
        res.end();
      })
      .catch(er => {
        res.status(405).send(er);
      })
  })
  //nickcarduccinj "our economy going down means less foreign treasury debit?"
  //paying expensive labor doesn't help them
  //you're all a bunch of socialists
  //I'm not an example man, I'm an example, man
  //Georgina123 "This journey is ours and we have to stop giving other people the power,
  //to shape our lives. (At least individually if we are forced into other paths)"
  //NagNagor "yes georgina123 we need to get rid of our MARKs of CAIN 000-00-0000"
  //GypsyMagic "we need to get rid of our MARKs of CAIN 000-00-0000"

  //WNBA should sue for opportunity cost - anybody.
  //all homeless are suicidal and moving to work
  //how can parents evict their children with deflation? "immigrants are good for us" classic roo daley

  //do we like when charlie normalizes being prude or declaring horny people homo
  //this is why he makes millions from super beets

  //what about feminine products groomers
  //​wrestling should be mandatory to know how to negotiate

  //[marriage banter] ​try posting on r/christianity

  //If only the disbelievers knew 
  //that a time will come when they will not be able to keep the 
  //Fire off their faces or backs, nor will they be helped. (21:39)
  //shame public

  //​on average 50-90 th percentile have $10k saverparty.xyz
  //inflation age adjustment
  //​gs/citadel won't let me short them sec
  .options("/", (req, res) => {
    var origin = req.headers.origin; //https://stackoverflow.com/questions/36554375/getting-the-request-origin-in-express
    if (allowedOrigins.indexOf(origin) === -1)
      return res
        .status(401)
        .send(`{error:${"no access for this origin- " + origin}}`);
    //res.header("":_)
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
    res.set(
      "Access-Control-Allow-Origin",
      allowedOrigins[allowedOrigins.indexOf(origin)]
    );
    res.set(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin, Access-Control-Allow-Methods, Origin, Content-Type, Referer, Accept"
    );
    res.set("Content-Type", "Application/JSON"); //res.send(200,"ok")
    res.status(204).send({ data: "ok" }); //res.sendStatus(204);
  })
  .post("/", (req, res) => {
    res.set("Content-Type", "Application/JSON");
    var origin = req.headers.origin;
    res.set("Access-Control-Allow-Origin", origin);
    var status = 200,
      statusText = "defaultText";
    res.status(status).send({ statusText, data });
  })
  .post("/lookup/atm", (req, res) => {
    res.set("Content-Type", "Application/JSON");
    var origin = req.headers.origin;
    res.set("Access-Control-Allow-Origin", origin);

    const { authHeader, payload /*, body*/ } = serializeHeader(
      "https://sandbox.api.mastercard.com/atms/v1/atm",
      "GET", //req.method,
      null //req.body, //_data
    );
    //res.status(204).send(authHeader);
    var status = 200,
      statusText = "defaultText";
    fetch("https://sandbox.api.mastercard.com/atms/v1/atm" + payload, {
      headers: {
        Authorization: authHeader
      }
    }) //https://developer.mastercard.com/mastercard-send-funding/documentation/api-basics/#http-headers
      .then(async (res) => {
        statusText = res.statusText;
        status = res.status;
        return await res.text();
      })
      .then((data) => {
        res.status(status).send({ statusText, data });
      })
      .catch((er) => {
        res.status(405).send(er);
      });
  })//try_files $uri $uri/ =404;
  //With this directive nginx tries to serve a static file (or directory),
  //and returns 404 if there is no such file.
  .post(
    "/cart/transaction", (
      req,
      res
    ) => {
      res.set("Content-Type", "Application/JSON");
      res.set("Access-Control-Allow-Origin", req.headers.origin);
      fetch(`https://app.snipcart.com/api/v1/orders/${req.body.transaction.id}/refunds`, {
        //SECRET_API_KEY: process.env.SECRET_API_KEY,
        headers: {
          Authorization: `Bearer ${snipcartkey}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
          amount: 0,
          comment: "transaction refunded"
        })
      }).then(async (res) => {
        statusText = res.statusText;
        status = res.status;
        return await res.json();
      })
        .then((data) => {
          res.status(status).send({ statusText, data });
        })
        .catch((er) => {
          res.status(401).send(er);
        });
    }
  )
  .post(
    "/cart/withdrawal", (
      req,
      res
    ) => {
      res.set("Content-Type", "Application/JSON");
      res.set("Access-Control-Allow-Origin", req.headers.origin);
      fetch(`https://app.snipcart.com/api/v1/orders/${req.body.withdrawal.id}/refunds`, {
        //SECRET_API_KEY: process.env.SECRET_API_KEY,
        headers: {
          Authorization: `Bearer ${snipcartkey}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
          amount: 0,
          comment: "withdrawal made"
        })
      }).then(async (res) => {
        statusText = res.statusText;
        status = res.status;
        return await res.json();
      })
        .then((data) => {
          res.status(status).send({ statusText, data });
        })
        .catch((er) => {
          res.status(401).send(er);
        });
    }
  )
  .post(
    "/card/issue",
    (
      req,
      res
    ) => {
      var { authHeader, payload, body } =
        serializeHeader(
          "https://sandbox.mi.api.mastercard.com/mi-issuing-sandbox/card-issuance/prepaid-cards",
          "POST",
          JSON.stringify(
            req.body
              ? req.body
              : {
                "X-MC-Bank-Code": "112233",
                "X-MC-Correlation-ID": "ac97d177-9345-4934-8343-0f91a7a02836",
                "X-MC-Source": "MAP",
                "X-MC-Client-Application-User-ID": "S0648-IN",
                "X-MC-Idempotency-Key": "bc57d177-4593-3449-8343-0d81a7a02947"
              }
          )
        )
      res.set("Content-Type", "Application/JSON");
      res.set("Access-Control-Allow-Origin", req.headers.origin);
      body = JSON.stringify(body);
      var statusText = "defaultText",
        status = 200;
      //https://developer.mastercard.com/mdes-digital-enablement/documentation/api-reference/
      //let api = new service.TokenizeApi();api.createTokenize
      fetch(
        "https://api.mastercard.com/mdes/digitization/static/1/0/tokenize",
        {
          //tokenizeRequestSchema:
          headers: {
            "Content-Type": "application/json",
            //"Access-Control-Request-Headers":"accept",
            Authorization: authHeader,
            Accept: "application/json"
          },
          body,
          method: "POST"
        }
      )
        .then(async (res) => {
          statusText = res.statusText;
          status = res.status;
          return { encryptedData: await res.text() };
        })
        .then(
          (
            fundingAccountInfo = (encryptedPayload) => {
              encryptedPayload;
            }
          ) => {
            body = {
              responseHost: "site1.your-server.com", //"vault-co.in"
              tokenRequestorId: "98765432101",
              tokenType: "CLOUD",
              fundingAccountInfo,
              taskId: "123456",
              consumerLanguage: "en",
              tokenizationAuthenticationValue:
                "RHVtbXkgYmFzZSA2NCBkYXRhIC0gdGhpcyBpcyBub3QgYSByZWFsIFRBViBleGFtcGxl",
              requestId: "123456"
            };
            body["decisioningData"] = {
              recommendation: "APPROVED",
              recommendationAlgorithmVersion: "01",
              deviceScore: "1",
              accountScore: "1",
              recommendationReasons: ["LONG_ACCOUNT_TENURE"],
              deviceCurrentLocation: "38.63,-90.25",
              deviceIpAddress: "127.0.0.1",
              mobileNumberSuffix: 3456
            };
            body = JSON.stringify(body);
            //(error, data, response) => {
            //TokenizeResponseSchema https://github.com/Mastercard/mastercard-api-client-tutorial/tree/main/nodejs
            fetch(
              "https://sandbox.mi.api.mastercard.com/mi-issuing-sandbox/card-issuance/prepaid-cards",// +payload,
              {
                headers: {
                  "Content-Type": "application/json",
                  //"Access-Control-Request-Headers":"accept",
                  Authorization: authHeader,
                  Accept: "application/json"
                },
                body,
                method: "POST"
              }
            ) //https://developer.mastercard.com/mastercard-send-funding/documentation/api-basics/#http-headers
              .then(async (res) => {
                statusText = res.statusText;
                status = res.status;
                return await res.text();
              })
              .then((data) => {
                res.status(status).send({ statusText, data });
              })
              .catch((er) => {
                res.status(403).send(er);
              });
          }
        )
        .catch((er) => {
          res.status(401).send(er);
        });
    }
  )
  .listen(port, () => console.log(`localhost:${port}`));
