var toolbox = '<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">\
<category name="Maths" colour="#5b6da5">\
  <block type="math_number">\
	<field name="NUM">0</field>\
  </block>\
  <block type="math_arithmetic">\
	<field name="OP">ADD</field>\
	<value name="A">\
	  <shadow type="math_number">\
		<field name="NUM">1</field>\
	  </shadow>\
	</value>\
	<value name="B">\
	  <shadow type="math_number">\
		<field name="NUM">1</field>\
	  </shadow>\
	</value>\
  </block>\
  <block type="math_single">\
	<field name="OP">ROOT</field>\
	<value name="NUM">\
	  <shadow type="math_number">\
		<field name="NUM">9</field>\
	  </shadow>\
	</value>\
  </block>\
  <block type="math_trig">\
	<field name="OP">SIN</field>\
	<value name="NUM">\
	  <shadow type="math_number">\
		<field name="NUM">45</field>\
	  </shadow>\
	</value>\
  </block>\
  <block type="math_constant">\
	<field name="CONSTANT">PI</field>\
  </block>\
  <block type="math_number_property">\
	<mutation divisor_input="false"></mutation>\
	<field name="PROPERTY">EVEN</field>\
	<value name="NUMBER_TO_CHECK">\
	  <shadow type="math_number">\
		<field name="NUM">0</field>\
	  </shadow>\
	</value>\
  </block>\
  <block type="math_round">\
	<field name="OP">ROUND</field>\
	<value name="NUM">\
	  <shadow type="math_number">\
		<field name="NUM">3.1</field>\
	  </shadow>\
	</value>\
  </block>\
  <block type="math_modulo">\
	<value name="DIVIDEND">\
	  <shadow type="math_number">\
		<field name="NUM">64</field>\
	  </shadow>\
	</value>\
	<value name="DIVISOR">\
	  <shadow type="math_number">\
		<field name="NUM">10</field>\
	  </shadow>\
	</value>\
  </block>\
  <block type="math_random_int">\
	<value name="FROM">\
	  <shadow type="math_number">\
		<field name="NUM">1</field>\
	  </shadow>\
	</value>\
	<value name="TO">\
	  <shadow type="math_number">\
		<field name="NUM">100</field>\
	  </shadow>\
	</value>\
  </block>\
  <block type="math_random_float"></block>\
</category>\
<category name="Move" colour="#a5805b">\
  <block type="forward"></block>\
  <block type="turn"></block>\
</category>\
<category name="Variables" colour="#a55b80" custom="VARIABLE"></category>\
<category name="Loops" colour="#5ba55b">\
  <block type="controls_repeat_ext">\
	<value name="TIMES">\
	  <shadow type="math_number">\
		<field name="NUM">10</field>\
	  </shadow>\
	</value>\
  </block>\
  <block type="controls_whileUntil">\
	<field name="MODE">WHILE</field>\
  </block>\
  <block type="controls_for">\
	<field name="VAR" id="+!Q`-*4Yc=m:v=jm|ss(" variabletype="">i</field>\
	<value name="FROM">\
	  <shadow type="math_number">\
		<field name="NUM">1</field>\
	  </shadow>\
	</value>\
	<value name="TO">\
	  <shadow type="math_number">\
		<field name="NUM">10</field>\
	  </shadow>\
	</value>\
	<value name="BY">\
	  <shadow type="math_number">\
		<field name="NUM">1</field>\
	  </shadow>\
	</value>\
  </block>\
</category>\
<category name="Functions" colour="#935ba5" custom="PROCEDURE"></category>\
<category name="Logic" colour="#5b80a5">\
  <block type="controls_if"></block>\
  <block type="logic_compare">\
	<field name="OP">EQ</field>\
  </block>\
  <block type="logic_operation">\
	<field name="OP">AND</field>\
  </block>\
  <block type="logic_negate"></block>\
  <block type="logic_boolean">\
	<field name="BOOL">TRUE</field>\
  </block>\
</category>\
</xml>';

var options = { 
	toolbox : toolbox, 
	collapse : true, 
	comments : true, 
	disable : true, 
	maxBlocks : Infinity, 
	trashcan : true, 
	horizontalLayout : true, 
	toolboxPosition : 'end', 
	css : true, 
	media : 'media/', 
	rtl : false, 
	scrollbars : true, 
	sounds : true, 
	oneBasedIndex : true, 
	grid : {
		spacing : 20, 
		length : 1, 
		colour : '#888', 
		snap : false
	},
	zoom : {
		controls : true, 
		wheel : true, 
		startScale : 1, 
		maxScale : 3, 
		minScale : 0.3, 
		scaleSpeed : 1.2
	}
};

/* Inject your workspace */ 
var workspace = Blockly.inject(blocklyDiv, options);

/* Load Workspace Blocks from XML to workspace. Remove all code below if no blocks to load */

/* TODO: Change workspace blocks XML ID if necessary. Can export workspace blocks XML from Workspace Factory. 
var workspaceBlocks = document.getElementById("workspaceBlocks"); 

/* Load blocks to workspace. 
Blockly.Xml.domToWorkspace(workspaceBlocks, workspace); */