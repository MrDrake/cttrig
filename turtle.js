var svgwidth = 500;
var svgheight = 500;
var speed = 0.2;

Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');
Blockly.JavaScript.addReservedWords('code');

function highlightBlock(id) {
    workspace.highlightBlock(id);
  }


var draw = SVG('turtleDiv').size(svgwidth, svgheight);
var linegroup = draw.group();

draw.image('play.png', 25, 25)
    .move(svgwidth-80, svgheight-25).opacity(0.5)
    .click(function() {RunCode()});
draw.image('reset.png', 25, 25)
    .move(svgwidth-55, svgheight-25).opacity(0.5)
    .click(function() {linegroup.clear()});
draw.image('save.png', 25, 25)
    .move(svgwidth-25, svgheight-25).opacity(0.5)
    .click(function() {SaveCode()});

/*var sprite = draw.image('turtle.png', 32, 32)
    .move(svgwidth/2-16, svgheight/2-16);*/

var turtle = {
    x: 0,
    y: 0,
    a: 0,
    d: 0,
    p: true
};


function RunCode() {
    var code = Blockly.JavaScript.workspaceToCode(workspace);

    turtle.d = 0;

    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}

function SaveCode() {
    var canvas = document.getElementById("tortoise");
    canvas.width = 2 * svgwidth;
    canvas.height = svgheight;
    var turtleimg = new Image();
    turtleimg.src = 'data:image/svg+xml;base64,' 
        + btoa(unescape(encodeURIComponent(draw.svg())));
    var blocklysvg = document.getElementsByClassName("blocklySvg")[0];
    var blocklystr = new XMLSerializer().serializeToString(blocklysvg);
    var blocklyimg = new Image();
    blocklyimg.src = 'data:image/svg+xml;base64,' 
    + btoa(unescape(encodeURIComponent(blocklystr)));
    var context = canvas.getContext('2d');
    blocklyimg.onload = function() {
        context.drawImage(blocklyimg, 0, 0, svgwidth, svgheight);
        context.drawImage(turtleimg, svgwidth, 0, svgwidth, svgheight);
        canvas.toBlob(function(blob) {
            saveAs(blob, "cttrig.png");
        });
    };
 
    /*var blob = new Blob([draw.svg()], {type: "image/svg+xml"});
    saveAs(blob, "cttrig.svg");*/
}

function TurtleTurn(angle) {
    turtle.a += angle;
    /*var delay = angle / speed;
    turtle.d += delay;*/
}

function TurtleForward(distance) {
    var newx = turtle.x + distance * Math.cos(turtle.a * Math.PI / 180);
    var newy = turtle.y + distance * Math.sin(turtle.a * Math.PI / 180);
    if(turtle.p) {
        var x1 = turtle.x + svgwidth/2;
        var y1 = -turtle.y + svgheight/2;
        var x2 = newx + svgwidth/2;
        var y2 = -newy + svgheight/2;
        var delay = distance / speed;
        linegroup.line(x1, y1, x1, y1).stroke({ width: 2, linecap: 'round' })
            .animate(delay, '<>', turtle.d).plot(x1, y1, x2, y2);
        turtle.d += delay;
        }
    turtle.x = newx;
    turtle.y = newy;
}

