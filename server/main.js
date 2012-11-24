Meteor.startup(function() {
//    P.remove({});
})

Meteor.methods({
    addPixel: function(p) {
        P.insert(p);
    },
    updatePixel: function(p) {
        P.update({id: p.id}, p);
    }
})
