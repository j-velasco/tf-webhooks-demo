# Typeform webhooks demo

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

We'll walk though Typeform's webhooks, and for that we'll create a basic typeform integration with Slack. The integration consists of a typeform to suggest readings and post those suggestions in a Slack channel.

## Create a typeform

Create a typeform with the following blocks:

1. [email] [required] What is your email address?
1. [website] [required] Which is the link of the reading(e.g. blog post, book)?
1. [long text] Why do you think this is an interesting reading?

Now go to the webhooks panel, introduce a valid URL(e.g. http://example.org) 
and hit "test webhook". A request with status and payload will appear in `recent requests`. Click on the payload id of the request. It will show a JSON content which was sent via POST to http://example.org (if you can't see it, try to click on the payload in a Firefox browser). You may copy it into an editor that supports json (something like https://jsoneditoronline.org):

```json
{
  "event_id": "hQJi65uTRz",
  "event_type": "form_response",
  "form_response": {
    "form_id": "R5ZNfR",
    "token": "4969bac7b56e83a82ad060f0ae57faed",
    "submitted_at": "2017-04-01T15:03:07Z",
    "definition": {
      "id": "R5ZNfR",
      "title": "Reading suggestion box",
      "fields": [
        {
          "id": "EE0L",
          "title": "What is your email address?",
          "type": "email"
        },
        {
          "id": "TFzu",
          "title": "Which is the link of the reading(e.g. blog post, book)?",
          "type": "website"
        },
        {
          "id": "v3Zc",
          "title": "Why do you think this is an interesting reading",
          "type": "long_text"
        }
      ]
    },
    "answers": [
      {
        "type": "email",
        "email": "an_account@example.com",
        "field": {
          "id": "EE0L",
          "type": "email"
        }
      },
      {
        "type": "url",
        "url": "http://example-url.com",
        "field": {
          "id": "TFzu",
          "type": "website"
        }
      },
      {
        "type": "text",
        "text": "Lorem ipsum dolor",
        "field": {
          "id": "v3Zc",
          "type": "long_text"
        }
      }
    ]
  }
}
```

For the next step you'll need to know the information about the fields
(*form_response.definition.fields*), in this example:
 
 ```json
[
     {
       "id": "EE0L",
       "title": "What is your email address?",
       "type": "email"
     },
     {
       "id": "TFzu",
       "title": "Which is the link of the reading(e.g. blog post, book)?",
       "type": "website"
     },
     {
       "id": "v3Zc",
       "title": "Why do you think this is an interesting reading",
       "type": "long_text"
     }
]
```

## Create an incoming webhook

Create an [incoming webhook](https://my.slack.com/services/new/incoming-webhook/) on the slack board where you want to post the suggestions.

## Deploy a proxy application in Heroku 
As you've seen above typeform payload is as generic as possible. We now need an application with a publicly available url which will translate typeform post requests into a slack incoming webhooks. A ready Heroku template for creating such an app is already in place.

Go [here](https://github.com/kooso/tf-webhooks-demo) and click on the "Deploy
 to Heroku button". Introduce required config:

- **SLACK_INCOMING_WEBHOOK**: go to the incoming webhook that you just created and copy the "Webhook URL".
- **Fields IDs(EMAIL_ID, LINK_ID and DESCRIPTION_ID)**: search in the payload of the test the form definition and find the ID for all the fields, in our example the IDs are EE0L, TFzu and v3Zc.

When then done, click in "Manage app" button, "Settings" tab and search by "Your app can be found at"; this is the URL that you'll use as the endpoint for your webhooks.

## Configure your typeform to send webhooks

To to your typeform webhooks settings(Configure->Webhooks). In destination paste the URL of your application and click on "Test Webhook", a message should be posted in the slack channel. Now enable the webhook and from now all the responses to your typeform will be posted in the Slack channel