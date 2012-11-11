# pubsub

Publish-subscribe pattern implementation.
Works in and outside of browser (CommonJS module).

## Examples

```javascript
function sub1(data) {
    console.log("First subscriber:", data);
}

function sub2(data) {
    console.log("Second subscriber:", data);
}

var sub1Token = pubsub.subscribe("msg", sub1);
var sub2Token = pubsub.subscribe("msg", sub2);
pubsub.publish("msg");

pubsub.unsubscribe("msg", sub1); // Unsubscribe, passing callback reference
pubsub.publish("msg", { param: "value" }); // Publish message, passing data object

pubsub.unsubscribe("msg", sub2Token); // Unsubscribe, passing token
pubsub.publish("msg");
```

## TODO
- Unsubscribe from all messages
- Add optional priority of subscribers