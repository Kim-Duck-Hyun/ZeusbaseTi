var TVOut = require('ti.tvout');

var viewForTV = Ti.UI.createView({ backgroundColor: '#93d3ff' });
TVOut.setView(viewForTV);
var ball = Ti.UI.createView({
    backgroundColor: 'red',
    width: 60, height: 60,
    borderRadius: 30,
    bottom: 0
});
viewForTV.add(ball);

TVOut.start();
var started = true;

var window = Ti.UI.createWindow({
    backgroundColor: '#fff'
});

var tvStatus = Ti.UI.createLabel({
    text: 'TV Connected? ' + (TVOut.connected ? 'Yes!' : 'No!'),
    top: 20, height: 50, width: 200, textAlign: 'center'
});
window.add(tvStatus);

var bounceTheBall = Ti.UI.createButton({
    title: 'Bounce The Ball',
    width: 200, height: 50,
    color: 'black'
});
bounceTheBall.addEventListener('click', function() {
    var animation = Titanium.UI.createAnimation({
        bottom: 80, duration: 300,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });

    function goBack() {
        animation.removeEventListener('complete', goBack);
        animation.bottom = 0;
        animation.duration = 200;
        ball.animate(animation);
    }

    animation.addEventListener('complete', goBack);
    ball.animate(animation);
});
window.add(bounceTheBall);

var toggleScreen = Ti.UI.createButton({
    title: started ? 'Stop TV' : 'Start TV',
    width: 200, height: 50, bottom: 20,
    color: 'black'
});
toggleScreen.addEventListener('click', function() {
    started = !started;
    toggleScreen.title = started ? 'Stop TV' : 'Start TV';
    if (started) {
        TVOut.start();
    }
    else {
        TVOut.stop();
    }
});
window.add(toggleScreen);

TVOut.addEventListener('connect', function() {
    tvStatus.text = 'TV Connected? Yes!';
});
TVOut.addEventListener('disconnect', function() {
    tvStatus.text = 'TV Connected? No!';
});

window.open();