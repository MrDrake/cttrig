level1 = { name: "Level 1 &ndash; Basic Bearings",
    variables: {bearing:0, distance:0, x:0, y:0},
    init: function() {
        this.variables.bearing = Math.floor(Math.random()*32)*5 + 10;
        this.variables.distance = Math.floor(Math.random()*20)*5 + 100;
        turtle.a = 90;
        turtle.x = -50;
        this.variables.x = this.variables.distance * Math.cos((90-this.variables.bearing)*Math.PI/180) + turtle.x;
        this.variables.y = this.variables.distance * Math.sin((90-this.variables.bearing)*Math.PI/180) + turtle.y;
        linegroup.image('blue.png', 32, 32).center(this.variables.x + svgwidth/2, -this.variables.y + svgheight/2);
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

levels = {"Level 1": level1}