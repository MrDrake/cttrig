var svgwidth = 500;
var svgheight = 500;

var draw = SVG('turtleDiv').size(svgwidth, svgheight);

var turtle = {
    x: 0,
    y: 0,
    a: 0
};

TurtleTurn = function(angle) {
    turtle.a += angle;
    /* update turtle picture */
}

TurtleForward = function(distance) {
    var newx = turtle.x + distance * Math.cos(turtle.a * Math.PI / 180);
    var newy = turtle.y + distance * Math.sin(turtle.a * Math.PI / 180);
    draw.line(turtle.x + svgwidth/2, -turtle.y + svgheight/2, newx + svgwidth/2, -newy + svgheight/2).stroke({ width: 2 });
    turtle.x = newx;
    turtle.y = newy;
    /* update turtle picture */
}

draw.rect(100, 100).move(100, 50).fill('#f06');

TurtleForward(100);
TurtleTurn(90);
TurtleForward(100);
