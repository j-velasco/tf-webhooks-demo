# Typeform webhook demo with Slack

We'll create a basic typeform integration with Slack, for that we'll create a typeform to suggest readings and post the suggestion in a Slack channel

## Step 1

Create a typeform with the following blocks:

1. [email] [required] What is your email address?
1. [website] [required] Which is the link of the reading(e.g. blog post, book)?
1. [long text] Why do you think this is an interesting reading?

Now go to the webhooks panel, introduce a valid URL(e.g. http://google.es) and hit "test webhook" you should see a request similar to the the [payload example](examples/test_payload.json).