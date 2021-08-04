
'use strict'

const AWS = require('aws-sdk')
AWS.config.update({region: process.env.AWS_REGION})
const eventbridge = new AWS.EventBridge()

exports.handleInbound = async (event, context) => {
  // extract and route to partner application
  // And now create the event...
  let data = JSON.parse(event.body);

  const params = {
    Entries: [ 
      {
        Detail: JSON.stringify(data),
        DetailType: 'inbound',
        Source: 'jabber.fivstreet',
        Time: new Date 
      }
    ]
  }
  const result = await eventbridge.putEvents(params).promise()

  console.log('--- Params ---')
  console.log(params)
  console.log('--- Response ---')
  console.log(result)
      
}

