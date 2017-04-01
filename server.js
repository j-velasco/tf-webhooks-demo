const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const parseWebhook = require('./webhook')

const channelWebhookUrl = process.env.SLACK_INCOMING_WEBHOOK

const app = express()


app.use(bodyParser.json())

app.post("/", (req, res) => {
  const webhook = parseWebhook(req.body)
  console.log("webhook received", webhook)

  postInSlackChannel(webhook);

  res.end()
})

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`✅  The server is running at http://localhost:${port}/`)
})


function postInSlackChannel (webhook) {
  request(channelWebhookUrl, {
    method: "POST",
    form: {
      payload: JSON.stringify({
        text: `Check out the <${webhook.link}|new reading> suggested by ${webhook.email}: "${webhook.description}"`
      })
    }
  }, (err, httpResponse, body) => {
    console.log("Response from Slack", err, body)
  })
}
