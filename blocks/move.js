Blockly.Blocks['forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("forward");
    this.appendValueInput("DISTANCE")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
 this.setTooltip("Move forward distance");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['turn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("turn");
    this.appendValueInput("ANGLE")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
 this.setTooltip("Turn anti-clockwise degrees");
 this.setHelpUrl("");
  }
};