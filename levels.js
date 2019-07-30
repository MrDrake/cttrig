function drawline(x1, y1, x2, y2, colour) {
    return linegroup.line(x1 + svgwidth/2, -y1 + svgheight/2, x2 + svgwidth/2, -y2 + svgheight/2).stroke({ width: 2, linecap: 'round', color: colour});
}

function drawblue(x1, y1) {
    return linegroup.image('blue.png', 32, 32).center(x1 + svgwidth/2, -y1 + svgheight/2);
}

function dcos(a) {
    return Math.cos((90-a)*Math.PI/180);
}

function dsin(a) {
    return Math.sin((90-a)*Math.PI/180);
}

function randint(a, b, c) {
    return Math.floor(Math.random()*((b-a)/c+1))*c + a;
}

function cosineside(A, b, c) {
    return Math.sqrt(b*b + c*c - 2*b*c*Math.cos(A*Math.PI/180));
}

function cosineangle(a, b, c) {
    return Math.acos((b*b + c*c - a*a)/(2*b*c))*180/Math.PI;
}

function sineside(A, B, b) {
    return Math.sin(A*Math.PI/180) * b / Math.sin(B*Math.PI/180);
}

function sineangle(a, b, B) {
    return Math.asin(a * Math.sin(B*Math.PI/180) / b)*180/Math.PI;
}


var level1 = { name: "Level 1 &ndash; Bearings 1",
    variables: {bearing:0, distance:0, x:0, y:0},
    init: function() {
        this.variables.bearing = randint(10, 170, 5);
        this.variables.distance = randint(100, 200, 5);
        turtle.a = 0;
        turtle.x = -50;
        this.variables.x = this.variables.distance * dcos(this.variables.bearing) + turtle.x;
        this.variables.y = this.variables.distance * dsin(this.variables.bearing) + turtle.y;
        drawblue(this.variables.x, this.variables.y);
    },
    text: function() {
        return "<p>You are currently facing due North.  Your friend has a bearing of "
            + this.variables.bearing + "&deg; and is " + this.variables.distance + " m away.</p>\n"
            + "<p>How do you move to your friend?</p>"
    },
    success: function() {
        return Math.abs(turtle.x-this.variables.x) < 0.01 && Math.abs(turtle.y-this.variables.y) < 0.01;
    }
};

level2 = { name: "Level 2 &ndash; Bearings 2",
    variables: {bearing:0, distance:0, x:0, y:0},
    init: function() {
        this.variables.bearing = randint(90, 260, 5);
        this.variables.distance = randint(100, 200, 5);
        turtle.a = 90;
        turtle.y = 50;
        this.variables.x = this.variables.distance * dcos(this.variables.bearing) + turtle.x;
        this.variables.y = this.variables.distance * dsin(this.variables.bearing) + turtle.y;
        drawblue(this.variables.x, this.variables.y);
    },
    text: function() {
        return "<p>You are currently facing due East.  Your friend has a bearing of "
            + this.variables.bearing + "&deg; and is " + this.variables.distance + " m away.</p>\n"
            + "<p>How do you move to your friend?</p>"
    },
    success: function() {
        return Math.abs(turtle.x-this.variables.x) < 0.01 && Math.abs(turtle.y-this.variables.y) < 0.01;
    }
};


level3 = { name: "Level 3 &ndash; Bearings 3",
    variables: {angle:0, bearing:0, distance:0, x:0, y:0},
    init: function() {
        this.variables.bearing = randint(190, 350, 5);
        this.variables.distance = randint(100, 200, 5);
        this.variables.angle = randint(190, 350, 5);
        if(this.variables.bearing == this.variables.angle) this.variables.angle -= 5;
        turtle.a = this.variables.angle;
        turtle.x = 100;
        this.variables.x = this.variables.distance * dcos(this.variables.bearing) + turtle.x;
        this.variables.y = this.variables.distance * dsin(this.variables.bearing) + turtle.y;
        drawblue(this.variables.x, this.variables.y);
    },
    text: function() {
        return "<p>You are currently facing bearing " + this.variables.angle + "&deg;.  Your friend has a bearing of "
            + this.variables.bearing + "&deg; and is " + this.variables.distance + " m away.</p>\n"
            + "<p>How do you move to your friend?</p>"
    },
    success: function() {
      return Math.abs(turtle.x-this.variables.x) < 0.01 && Math.abs(turtle.y-this.variables.y) < 0.01;
    }
};

level4 = { name: "Level 4 &ndash; Pythagoras 1",
    variables: {d1:0, d2:0, x:0, y:0},
    init: function() {
        this.variables.d1 = randint(150, 250, 5);
        this.variables.d2 = randint(150, 250, 5);

        turtle.a = 180 - Math.atan(this.variables.d2/this.variables.d1)*180/Math.PI;
        turtle.x = -100;
        turtle.y = -100 + this.variables.d1;

        this.variables.x = turtle.x + this.variables.d2;
        this.variables.y = turtle.y - this.variables.d1;

        drawline(turtle.x, this.variables.y, turtle.x, turtle.y, 'red');
        drawline(turtle.x, this.variables.y, this.variables.x, this.variables.y, 'blue');
        drawblue(this.variables.x, this.variables.y);
    },
    text: function() {
        return "<p>You moved " + this.variables.d1 + " m due North, while your friend moved "
            + this.variables.d2 + " m due East.</p>\n"
            + "<p>How far away is your friend?</p>"
    },
    success: function() {
      return Math.abs(turtle.x-this.variables.x) < 0.01 && Math.abs(turtle.y-this.variables.y) < 0.01;
    }
};

level5 = { name: "Level 5 &ndash; Pythagoras 2",
    variables: {d1:0, d2:0, x:0, y:0},
    init: function() {
        this.variables.d1 = randint(150, 250, 5);
        this.variables.d2 = this.variables.d1 + randint(50, 100, 5);

        var d3 = Math.sqrt(this.variables.d2*this.variables.d2 - this.variables.d1*this.variables.d1);

        turtle.a = 90;
        turtle.x = -100;
        turtle.y = -100 + this.variables.d1;

        this.variables.x = turtle.x + d3;
        this.variables.y = turtle.y;

        drawline(turtle.x, turtle.y - this.variables.d1, turtle.x, turtle.y, 'red');
        drawline(turtle.x, turtle.y - this.variables.d1, this.variables.x, this.variables.y, 'blue');
        drawblue(this.variables.x, this.variables.y);
    },
    text: function() {
        return "<p>You moved " + this.variables.d1 + " m due North, while your friend moved "
            + this.variables.d2 + " m.  Your friend is now due East of you.</p>\n"
            + "<p>How far away is your friend?</p>"
    },
    success: function() {
      return Math.abs(turtle.x-this.variables.x) < 0.01 && Math.abs(turtle.y-this.variables.y) < 0.01;
    }
};

leveln11 = { name: "Level n-1 &ndash; Sine Rule (Side Form) 1",
    variables: {d:0, b1:0, b2:0, x:0, y:0},
    init: function() {
        this.variables.d = randint(50, 100, 5);
        this.variables.b1 = randint(45, 65, 5);
        this.variables.b2 = this.variables.b1 + randint(15, 20, 5);

        var d1 = sineside(180-this.variables.b2, this.variables.b2-this.variables.b1, this.variables.d);

        turtle.a = this.variables.b2;
        turtle.x = -150;
        turtle.y = -150;

        this.variables.x = d1 * dcos(this.variables.b1) + turtle.x;
        this.variables.y = d1 * dsin(this.variables.b1) + turtle.y;

        drawline(turtle.x, turtle.y, turtle.x, turtle.y + this.variables.d, 'red');
        drawline(turtle.x, turtle.y, this.variables.x, this.variables.y, 'blue');
        drawblue(this.variables.x, this.variables.y);

        turtle.y += this.variables.d;
    },
    text: function() {
        return "<p>Your friend walked at a bearing of " + this.variables.b1 + "&deg;. You then walked "
            + this.variables.d + " m due North.  Your friend now has a bearing of " + this.variables.b2 + "&deg.<p>\n"
            + "<p>How far away is your friend?</p>";
    },
    success: function() {
        return Math.abs(turtle.x-this.variables.x) < 0.01 && Math.abs(turtle.y-this.variables.y) < 0.01;
    }
};

leveln = { name: "Level n &ndash; Cosine Rule (Side Form) 1",
    variables: {d1:0, d2:0, b:0, x:0, y:0},
    init: function() {
        this.variables.d1 = randint(100, 150, 5);
        this.variables.d2 = randint(100, 150, 5);
        this.variables.b = randint(40, 140, 5);
        if(this.variables.b == 90) this.variables.b = 85;


        var d3 = cosineside(180-this.variables.b, this.variables.d1, this.variables.d2);

        turtle.a = sineangle(this.variables.d2, d3, 180-this.variables.b);
        turtle.x = -50;
        turtle.y = -100;

        this.variables.x = this.variables.d2 * dcos(this.variables.b) + turtle.x;
        this.variables.y = this.variables.d2 * dsin(this.variables.b) + this.variables.d1 + turtle.y;

        drawline(turtle.x, turtle.y, turtle.x, turtle.y + this.variables.d1, 'blue');
        drawline(turtle.x, turtle.y + this.variables.d1, this.variables.x, this.variables.y, 'blue');
        drawblue(this.variables.x, this.variables.y);
    },
    text: function() {
        return "<p>Your friend walked " + this.variables.d1 + " m due North, then walked "
            + this.variables.d2 + " m at a bearing of " + this.variables.b + "&deg;.<p>\n"
            + "<p>How far away is your friend?</p>";
    },
    success: function() {
        return Math.abs(turtle.x-this.variables.x) < 0.01 && Math.abs(turtle.y-this.variables.y) < 0.01;
    }
};

leveln1 = { name: "Level n+1 &ndash; Cosine Rule (Side Form) 2",
    variables: {d1:0, d2:0, b:0, x:0, y:0},
    init: function() {
        this.variables.d1 = randint(150, 250, 5);
        this.variables.d2 = randint(150, 250, 5);
        this.variables.b = randint(15, 85, 5);

        var d3 = cosineside(this.variables.b, this.variables.d1, this.variables.d2);

        turtle.a = 180 - sineangle(this.variables.d2, d3, 180-this.variables.b);
        turtle.x = -100;
        turtle.y = -100;

        this.variables.x = this.variables.d2 * dcos(this.variables.b) + turtle.x;
        this.variables.y = this.variables.d2 * dsin(this.variables.b) + turtle.y;

        drawline(turtle.x, turtle.y, turtle.x, turtle.y + this.variables.d1, 'red');
        drawline(turtle.x, turtle.y, this.variables.x, this.variables.y, 'blue');
        drawblue(this.variables.x, this.variables.y);

        turtle.y += this.variables.d1;5
        if(turtle.y < this.variables.y) turtle.a = 180 - turtle.a;
    },
    text: function() {
        return "<p>You walked " + this.variables.d1 + " m due North, while your friend walked "
            + this.variables.d2 + " m at a bearing of " + this.variables.b + "&deg;.</p>"
            + "<p>How far away is your friend?</p>";
    },
    success: function() {
        return Math.abs(turtle.x-this.variables.x) < 0.01 && Math.abs(turtle.y-this.variables.y) < 0.01;
    }
};

leveln2 = { name: "Level n+2 &ndash; Using what you know 1",
    variables: {d1:0, d2:0, b:0, x:0, y:0},
    init: function() {
        this.variables.d1 = randint(50, 100, 5);
        this.variables.d2 = randint(150, 200, 5);
        this.variables.b = randint(40, 140, 5);
        if(this.variables.b == 90) this.variables.b = 85;

        var d3 = cosineside(180-this.variables.b, this.variables.d1, this.variables.d2);

        turtle.a = 0;
        turtle.x = -100;
        turtle.y = -50;

        this.variables.x = this.variables.d2 * dcos(this.variables.b) + turtle.x;
        this.variables.y = this.variables.d2 * dsin(this.variables.b) + this.variables.d1 + turtle.y;

        drawline(turtle.x, turtle.y, turtle.x, turtle.y + this.variables.d1, 'blue');
        drawline(turtle.x, turtle.y + this.variables.d1, this.variables.x, this.variables.y, 'blue');
        drawblue(this.variables.x, this.variables.y);
    },
    text: function() {
        return "<p>You are facing due North.  Your friend walked " + this.variables.d1 + " m due North, then walked "
            + this.variables.d2 + " m at a bearing of " + this.variables.b + "&deg;.<p>\n"
            + "<p>How do you move to your friend?</p>";
    },
    success: function() {
        return Math.abs(turtle.x-this.variables.x) < 0.01 && Math.abs(turtle.y-this.variables.y) < 0.01;
    }
};

leveln3 = { name: "Level n+3 &ndash; Using what you know 2",
    variables: {d1:0, d2:0, b:0, x:0, y:0},
    init: function() {
        this.variables.d1 = randint(50, 150, 5);
        this.variables.d2 = randint(100, 200, 5);
        this.variables.b = randint(95, 145, 5);

        var d3 = cosineside(this.variables.b, this.variables.d1, this.variables.d2);

        turtle.a = 0;
        turtle.x = -100;
        turtle.y = 0;

        this.variables.x = this.variables.d2 * dcos(this.variables.b) + turtle.x;
        this.variables.y = this.variables.d2 * dsin(this.variables.b) + turtle.y;

        drawline(turtle.x, turtle.y, turtle.x, turtle.y + this.variables.d1, 'red');
        drawline(turtle.x, turtle.y, this.variables.x, this.variables.y, 'blue');
        drawblue(this.variables.x, this.variables.y);

        turtle.y += this.variables.d1;
    },
    text: function() {
        return "<p>You walked " + this.variables.d1 + " m due North, while your friend walked "
            + this.variables.d2 + " m at a bearing of " + this.variables.b + "&deg;.</p>"
            + "<p>How do you move to your friend?</p>";
    },
    success: function() {
        return Math.abs(turtle.x-this.variables.x) < 0.01 && Math.abs(turtle.y-this.variables.y) < 0.01;
    }
};

var levels = {"Start": null, "Level 1": level1, "Level 2": level2, "Level 3": level3, "Level 4": level4,
    "Level 5": level5, "Level n-1": leveln11, "Level n": leveln, "Level n+1": leveln1, 
    "Level n+2": leveln2, "Level n+3": leveln3}
var currentlevel = null;
setlevel = function(lev) {
    currentlevel = levels[lev];
    ClearTurtle();
}

var element = document.getElementById('menu');
var menutext = "";
for(lev in levels) {
    menutext += "<span><a href='#" + lev + "' onclick='setlevel(\"" + lev + "\");'>" + lev + "</a></span>\n";
};
element.innerHTML = menutext;