# RingCentral audit trail app demo

A demo app tracking RingCentral account change with audit trail api

## Video

todo

## Dev

### Prepare

- First, need create a AWS account, we will use free AWS dynamodb, and put your aws credentials in ~/.aws/credentials, check [https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)

- Go to [RingCentral Developer Portal](https://developers.ringcentral.com/) and [create a rest api app, web based](https://developers.ringcentral.com/guide/basics/create-app) with permissions: `ReadAccount`, `ReadAuditTrail`, set `http://localhost:6066/rc-oauth` as `Callback url`, if do not have the `ReadAuditTrail` permission, please contact RingCentral to request it.

### Run

```bash
# install deps
npm i

# create env
cp sample-env.env .env
# then edit .env fill all required fields

# create config file
cp config-examples/simple-config.js ./config.js

# start server
npm start

# start client server in another terminal
npm run c

```

Then visit [http://localhost:6066](http://localhost:6066), and login with your account. After login, server will fetch recent user action history every a few minutes and log to console

## Log to AWS Dynamodb

```bash
# use config-aws
cp config-examples/config-aws.js ./config.js
# start server
npm start
```

## Log to splunk events

Edit `.env`, add `SPLUNK_TOKEN`

```bash
# use config-aws
cp config-examples/config-splunk.js ./config.js
# start server
npm start
```

## LICENSE

MIT
