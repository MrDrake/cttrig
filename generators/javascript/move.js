Blockly.JavaScript['forward'] = function(block) {
  var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'TurtleForward(' + value_distance + ');\n';
  return code;
};

Blockly.JavaScript['turn'] = function(block) {
  var value_angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'TurtleTurn(' + value_angle + ');\n';
  return code;
};