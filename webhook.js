const mapOfFieldIds = {
  "email": process.env.EMAIL_ID,
  "link": process.env.LINK_ID,
  "description": process.env.DESCRIPTION_ID
}

function parseWebhook(webhook) {
  return {
    link: extractResponseForFieldOfId(webhook, mapOfFieldIds.link, "url"),
    email: extractResponseForFieldOfId(webhook, mapOfFieldIds.email, "email"),
    description: extractResponseForFieldOfId(webhook, mapOfFieldIds.description, "text")
  }
}

function extractResponseForFieldOfId(webhook, id, fieldKey) {
  const answer = webhook.form_response.answers.filter(a => a.field.id === id);
  return answer.length == 1 ? answer[0][fieldKey] : null;
}

module.exports = parseWebhook