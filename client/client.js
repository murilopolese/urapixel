Meteor.startup(function() {
	Meteor.call( 'setUserId', function( err, userId ) {
		Meteor.connection.setUserId( userId );
	});
});

Meteor.subscribe( 'pixels' );

Template.pixels.helpers({
	pixels: function() {
		return Pixel.find({});
	}
});

Template.pixels.onRendered(function() {
	$( 'body' ).on( 'keyup', function( e ) {
		e.preventDefault();
		switch ( e.keyCode ) {
			case 87:
			case 38:
				update( 'up' );
				break;
			case 83:
			case 40:
				update( 'down' );
				break;
			case 65:
			case 37:
				update( 'left' );
				break;
			case 68:
			case 39:
				update( 'right' );
				break;
			default:
		}
	})
});

var update = function( direction ) {
	var pixel = Pixel.findOne( { owner: Meteor.userId() } );
	if( !pixel ) {
		console.log( 'bad user, no pixel for you' );
		return false;
	}

	switch ( direction ) {
		case 'up':
			pixel.top -= 25;
			break;
		case 'down':
			pixel.top += 25;
			break;
		case 'left':
			pixel.left -= 25;
			break;
		case 'right':
			pixel.left += 25;
			break;
		default:
	}

	if( Session.equals( 'saving', true ) ) {
		console.log( 'calm down, fella' );
		return false;
	}
	Session.set( 'saving', true );

	Pixel.update(
		pixel._id,
		{ $set: { top: pixel.top, left: pixel.left } },
		function() {
			Session.set( 'saving', false );
		}
	)

}
