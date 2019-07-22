level1 = { name: "Level 1",
    variables: {bearing: 0, distance: 0},
    init: function() {
        this.variables.bearing = Math.floor(Math.random()*16)*5 + 5;
        this.variables.distance = Math.floor(Math.random()*12)*5 + 60;
        turtle.a = 90;
    },
    text: function() {
        return "<p>You are currently facing due North.  Your friend has a bearing of "
            + this.variables.bearing + "&deg; and is " + this.variables.distance + " m away.</p>\n"
            + "<p>How do you move to your friend?</p>"
    },
    success: function() {
        var x = this.variables.distance * Math.cos((90-this.variables.bearing)*Math.PI/180);
        var y = this.variables.distance * Math.sin((90-this.variables.bearing)*Math.PI/180);
        return Math.abs(turtle.x-x) < 0.01 && Math.abs(turtle.y-y) < 0.01;
    }
};

levels = {"Level 1": level1}