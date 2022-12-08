>To represent the encapsulated text of a PEM message, the encoding function's output is delimited into text lines (using local conventions), with each line except the last containing exactly 64 printable characters and the final line containing 64 or fewer printable [characters](https://serverfault.com/a/884930).

([how to node-forge p12 to](https://github.com/NickCarducci/mastercard-forge-pkcs-oauth-rsasha)):

# Signature Base String - [oauth.net/core/1.0a/](https://oauth.net/core/1.0a/)

METHOD&http%3A%2F%2Fsandbox.api.mastercard.com/atms/v1/atm

&=

%26oauth_consumer_key%3Ddpf43f3p2l4k3l03
%26oauth_nonce%3Dkllo9940pd9333jh
%26oauth_signature_method%3DHMAC-SHA1
%26oauth_timestamp%3D1191242096
%26oauth_token%3Dnnch734d00sl2jdk
%26oauth_version%3D1.0
%26size%3Doriginal

METHOD&http%3A%2F%2Fsandbox.api.mastercard.com/atms/v1/atm&file%3Dvacation.jpg

>sign certificate (sbs-uri) with private key

## ['signing'(Private)Key](https://github.com/Mastercard/oauth1-signer-ruby/blob/1187441f84b2eb07524cd1fc11f3be8e94e21609/lib/oauth.rb#L196), 'sbs'SignatureBase

[oauth base string](https://stackoverflow.com/questions/8338661/implementation-hmac-sha1-in-python/8339781#8339781)

[POSTHTTPS<path><query><protocol>.split("oauth_signature")[0]<body>](https://www.rfc-editor.org/rfc/rfc5849#section-3.4.1.3)

"HMAC-SHA1" (client [key,token[credentials](https://www.rfc-editor.org/rfc/rfc5849#section-3.4.1.3.2)])
"RSA-SHA1" (private/pem [key,crt/certificate-signature[PKCS#1](https://www.rfc-editor.org/rfc/rfc5849#section-3.4.3)])
"PLAINTEXT" (TLS/SSH)

[test_get_authorization_header](https://github.com/Mastercard/oauth1-signer-ruby/blob/main/tests/test_oauth.rb)

>uri, method, nil, consumer_key, signing_key

>~~[except in zsh, shell variables cannot store arbitrary](https://unix.stackexchange.com/questions/369972/how-can-i-set-an-environment-variable-which-contains-newline-characters) sequences of bytes~~

~~`export p12=$(< file_to_be_read)`~~

openssl pkcs12 -info -in Passwordfine-sandbox.p12 -nodes

[`openssl pkcs12 -info -in Passwordfine-sandbox.p12 -out Passwordfine-sandbox.pem -nodes`](https://www.ssl.com/how-to/export-certificates-private-key-from-pkcs12-file-with-openssl/) 

paste this into `src/oauthRSA-SHA-PKCS1.js\p12` instead of export environment with new lines

`sudo nano src/oauthRSA-SHA-PKCS.js`
````
const consumerKey = "";
const p12 = "";

export default {
    consumerKey,
    p12
}
````
what are politicians doing that is progressive? I can't say deficit