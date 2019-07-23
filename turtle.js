// global variables
var svgwidth = 500;
var svgheight = 500;
var speed = 0.2;

// for accessing variables
Blockly.JavaScript.addReservedWords('code');

// setup SVG and add linegroup for easy resetting
var draw = SVG('turtleDiv').size(svgwidth, svgheight);
var linegroup = draw.group();

// setup turtle object
var turtle;
ClearTurtle();

// add buttons on svg
draw.image('play.png', 25, 25)
    .move(svgwidth-80, svgheight-25).opacity(0.5)
    .click(function() {RunCode()});
draw.image('reset.png', 25, 25)
    .move(svgwidth-55, svgheight-25).opacity(0.5)
    .click(function() {ClearTurtle()});
/*draw.image('save.png', 25, 25)
    .move(svgwidth-25, svgheight-25).opacity(0.5)
    .click(function() {SaveCode()});*/

// transform blocks to JS and run    
function RunCode() {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    var varstr = "<p>&nbsp;</p>";   // empty variable list
    var x;

    // create html of variables
    for(x of workspace.getAllVariables()) {
        varstr += '<p id="TurtleVar' + x.name + '" class="var"></p>';
    }
    // todo: add to svg instead?
    
    // show variables in div
    var vars = document.getElementById('variables');
    vars.innerHTML = varstr;

    // initialise delay for animation
    turtle.d = 0;

    try {
        eval(code);     // run code

        // show feedback
        // todo: do we always need feedback?
        if(level1.success()) {  // todo: change to whatever level
            alert("Well done!\nYou did it!");   
        } else {
            alert("Not quite!\nTry again!");
        }
    } catch (e) {
        alert(e);   // shouldn't be any errors but you never know!
    }
}

// whenever a variables is updated, update it in div too
function UpdateVariable(varname, value) {
    var element = document.getElementById('TurtleVar' + varname);
    // round to 6 sig fig
    element.innerHTML = '<em>' + varname + '</em> = ' + (+value.toFixed(6));
}

// initialise turtle
function ClearTurtle() {
    // clear any drawing
    linegroup.clear();

    // set up turtle object
    turtle = {
        x: 0,
        y: 0,
        a: 0,
        d: 0,
        p: true,
        s: null
    }   

    // initialise level and update text
    level1.init();
    document.getElementById('instructions').innerHTML = level1.text();

    // draw turtle sprite
    var x1 = turtle.x + svgwidth/2;
    var y1 = -turtle.y + svgheight/2;
    turtle.s = linegroup.image('red.png', 32, 32).center(x1, y1).rotate(90-turtle.a, x1, y1);
}

// turn turtle clockwise angle and animate sprite
function TurtleTurn(angle) {
    turtle.a -= angle;  // svg uses anti-clockwise but we want clockwise
    var delay = Math.abs(angle) / speed;    // calculate delay for animation
    var x1 = turtle.x + svgwidth/2;
    var y1 = -turtle.y + svgheight/2;
    // animate sprite rotating
    turtle.s.animate(delay, '<>', 0).rotate(90-turtle.a, turtle.s.cx(), turtle.s.cy());
    // todo: fix extra rotation of sprite due to multiples of 360
    // add to delay for animation
    turtle.d += delay;
}

// move turtle forward distance and animate sprite and path
function TurtleForward(distance) {
    // calculate start of line
    var x1 = turtle.x + svgwidth/2;
    var y1 = -turtle.y + svgheight/2;

    // calculate end of line
    turtle.x = turtle.x + distance * Math.cos(turtle.a * Math.PI / 180);
    turtle.y = turtle.y + distance * Math.sin(turtle.a * Math.PI / 180);
    var x2 = turtle.x + svgwidth/2;
    var y2 = -turtle.y + svgheight/2;

    // calculate delay and animate sprite
    var delay = Math.abs(distance) / speed;
    turtle.d += delay;
    turtle.s.animate(delay, '<>', 0).dy(-distance);

    // only draw path if pen down
    if(turtle.p) {
        linegroup.line(x1, y1, x1, y1).stroke({ width: 2, linecap: 'round', color: 'orange' })
            .animate(delay, '<>', turtle.d).plot(x1, y1, x2, y2);
    }
}

// save code and SVG image
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

