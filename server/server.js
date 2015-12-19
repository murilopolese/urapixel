Meteor.startup(function() {
	// Pixel.remove({});
});

Meteor.publish( 'pixels', function() {
	return Pixel.find({});
})

Meteor.onConnection(function( opts ) {
	// Add a pixel with the owner being the connection id
	Pixel.insert({
		owner: opts.id,
		background: Colors[ parseInt( Math.random() * Colors.length ) ],
		top: parseInt( Math.random() * 5 ) * 25,
		left: parseInt( Math.random() * 5 ) * 25
	});
});

Meteor.methods({
	setUserId: function() {
		// Fake a login by setting the userId to be the connection id
		console.log( 'connectionId', this.connection.id );
		this.setUserId( this.connection.id );
		return this.connection.id;
	}
})
