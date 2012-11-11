# pubsub

Publish-subscribe pattern implementation.

## Examples

```javascript
function sub1(data) {
	console.log('First subscriber:', data);
}

function sub2(data) {
	console.log('Second subscriber:', data);
}

pubsub.subscribe('msg', sub1);
pubsub.subscribe('msg', sub2);
pubsub.publish('msg');
pubsub.unsubscribe(sub1);
pubsub.publish('msg');
```

## TODO
- Add tokens for subscribers and enable unsubscibing with tokens
- Add optional priority of subscribers