// global variables
var svgwidth = 500;
var svgheight = 500;
var speed = 0.2;
var colour = 'black';

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
    .move(svgwidth-60, svgheight-35).opacity(0.5)
    .click(function() {RunCode()});
draw.image('reset.png', 25, 25)
    .move(svgwidth-35, svgheight-35).opacity(0.5)
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
        if(currentlevel) {
            if(currentlevel.success()) {  // todo: change to whatever level
                alert("Well done!\nYou did it!");   
            } else {
                alert("Not quite!\nTry again!");
            }
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
        x: 0, y: 0, a: 90,  // position and orientation
        d: 0,               // delay
        p: true,            // is pen down?
        n: null, s: null    // sprites
    }   

    // initialise level and update text
    if(currentlevel) {
        currentlevel.init();
        document.getElementById('leveltitle').innerHTML = currentlevel.name;
        document.getElementById('instructions').innerHTML = currentlevel.text();
    } else {
        document.getElementById('leveltitle').innerHTML = "Mr. Drake's Trig Game";
        document.getElementById('instructions').innerHTML = "<p>Welcome to Mr. Drake's Trig Game!</p>\n"
            + "<p>Your job is to solve some challenges by programming your avatar and using Trigonometry.</p>\n"
            + "<p>Start playing around to get used to the controls before starting Level 1!</p>";
    }

    // draw turtle sprite
    var x1 = turtle.x + svgwidth/2;
    var y1 = -turtle.y + svgheight/2;

    turtle.n = linegroup.nested().center(x1, y1);
    turtle.s = turtle.n.image('red.png', 32, 32).center(0, 0).rotate(90-turtle.a);
}

// turn turtle clockwise angle and animate sprite
function TurtleTurn(angle) {
    turtle.a -= angle;  // svg uses anti-clockwise but we want clockwise
    if(turtle.a < -180) turtle.a += 360;
    if(turtle.a > 180) turtle.a -= 360;

    var delay = Math.abs(angle) / speed;    // calculate delay for animation
    
    // angle to turn sprite
    var turn = 90-turtle.a;
    if(turn < -180) turn += 360;
    if(turn > 180) turn -= 360;

    turtle.s.animate(delay, '<>', 0).rotate(turn);
    // todo: fix occasional bug of extra rotation of sprite (multiple of 180?)

    // add to delay for animation
    //turtle.d += delay;
}

// move turtle forward distance and animate sprite and path
function TurtleForward(distance) {
    // calculate start of line
    var x1 = turtle.x + svgwidth/2;
    var y1 = -turtle.y + svgheight/2;
    var dx = distance * Math.cos(turtle.a * Math.PI / 180);
    var dy = distance * Math.sin(turtle.a * Math.PI / 180);

    // calculate end of line
    turtle.x += dx;
    turtle.y += dy;
    var x2 = turtle.x + svgwidth/2;
    var y2 = -turtle.y + svgheight/2;

    // calculate delay and animate sprite
    var delay = Math.abs(distance) / speed;
    turtle.n.animate(delay, '<>', 0).move(x2, y2);

    // only draw path if pen down
    if(turtle.p) {
        linegroup.line(x1, y1, x1, y1).stroke({ width: 2, linecap: 'round', color: colour})
            .animate(delay, '<>', turtle.d).plot(x1, y1, x2, y2);
    }

    // add to delay for animation
    turtle.d += delay;
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

