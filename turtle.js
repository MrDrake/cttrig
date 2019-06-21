var svgwidth = 500;
var svgheight = 500;
var speed = 0.2;

Blockly.JavaScript.addReservedWords('code');

var draw = SVG('turtleDiv').size(svgwidth, svgheight);
var linegroup = draw.group();

var turtle;
ClearTurtle();

draw.image('play.png', 25, 25)
    .move(svgwidth-80, svgheight-25).opacity(0.5)
    .click(function() {RunCode()});
draw.image('reset.png', 25, 25)
    .move(svgwidth-55, svgheight-25).opacity(0.5)
    .click(function() {ClearTurtle()});
/*draw.image('save.png', 25, 25)
    .move(svgwidth-25, svgheight-25).opacity(0.5)
    .click(function() {SaveCode()});*/

function RunCode() {
        var code = Blockly.JavaScript.workspaceToCode(workspace);
        var varstr = "<p>&nbsp;</p>";
        var x;
    
        for(x of workspace.getAllVariables()) {
            varstr += '<p id="TurtleVar' + x.name + '" class="var"></p>';
        }
        
        var vars = document.getElementById('variables');
        vars.innerHTML = varstr;
    
        turtle.d = 0;
    
        try {
            eval(code);
        } catch (e) {
            alert(e);
        }
}
    
function UpdateVariable(varname, value) {
    var element = document.getElementById('TurtleVar' + varname);
    element.innerHTML = '<em>' + varname + '</em> = ' + (+value.toFixed(6));
}


function ClearTurtle() {
    linegroup.clear();
    turtle = {
        x: 0,
        y: 0,
        a: 0,
        d: 0,
        p: true,
        s: null
    }   
    turtle.s = linegroup.polygon(DrawTurtle());
}

function DrawTurtle() {
    var x1 = turtle.x + svgwidth/2;
    var y1 = -turtle.y + svgheight/2;
    return [[x1, y1],
        [x1+10*Math.cos((turtle.a+150)*Math.PI/180),y1-10*Math.sin((turtle.a+150)*Math.PI/180)],
        [x1+10*Math.cos((turtle.a-150)*Math.PI/180),y1-10*Math.sin((turtle.a-150)*Math.PI/180)]];   
}

function TurtleTurn(angle) {
    turtle.a += angle;
    var delay = angle / speed;
    turtle.s.animate(delay, '<>', 0).plot(DrawTurtle());
    turtle.d += delay;
}

function TurtleForward(distance) {
    var x1 = turtle.x + svgwidth/2;
    var y1 = -turtle.y + svgheight/2;
    turtle.x = turtle.x + distance * Math.cos(turtle.a * Math.PI / 180);
    turtle.y = turtle.y + distance * Math.sin(turtle.a * Math.PI / 180);
    if(turtle.p) {
        var x2 = turtle.x + svgwidth/2;
        var y2 = -turtle.y + svgheight/2;
        var delay = distance / speed;
        linegroup.line(x1, y1, x1, y1).stroke({ width: 2, linecap: 'round' })
            .animate(delay, '<>', turtle.d).plot(x1, y1, x2, y2);
        turtle.s.animate(delay, '<>', 0).plot(DrawTurtle());
        turtle.d += delay;
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
}

