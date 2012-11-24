var p = {
    id: parseInt(Math.random()*10000000000000000),
    x: parseInt(Math.random() * $(window).width()/20)*20,
    y: parseInt(Math.random() * $(window).height()/20)*20,
    color: 'rgb(' + parseInt(Math.random()*255) + ', ' + parseInt(Math.random()*255) + ', ' + parseInt(Math.random()*255) + ')'
};
var key = '';
var interval;
Meteor.startup(function() {
    console.log('começou cliente');
    Meteor.call('addPixel', p);
    $('.help').click(function() {
        $('.help p').toggle();
    })
    $(document).keypress(function(e) {
        clearInterval(interval);
        if(e.charCode == 119) { // w
            p.y -= 20;
        }
        if(e.charCode == 115) { // s
            p.y += 20;
        }
        if(e.charCode == 97) { // a
            p.x -= 20;
        }
        if(e.charCode == 100) { // d
            p.x += 20;
        }
        $('#'+p.id).css ({
            top: p.y+'px',
            left: p.x+'px'
        })
        interval = setTimeout(function() {
            Meteor.call('updatePixel', p);
        }, 500)
    })
})

Template.pixels.pixel = function() {
    return P.find();
}

Template.pixels.isYou = function(pixId) {
    return p.id == this.id;
}