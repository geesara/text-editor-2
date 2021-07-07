"use strict"

var selection_data = {
	is_collapsed: true,
	start_line: 0,
	start_pos: 0,
	end_line: 0,
	end_pos: 0
}

function update_selection_data() {
	var selection = document.getSelection()
	var first_line = selection.anchorNode.parentElement.line_no
	var first_pos = selection.anchorOffset
	var second_line = selection.focusNode.parentElement.line_no
	var second_pos = selection.focusOffset
	selection_data.is_collapsed = selection.isCollapsed
	
	if(first_line == second_line) {
		if(first_pos < second_pos) {
			selection_data.start_line = first_line
			selection_data.start_pos = first_pos
			selection_data.end_line = second_line
			selection_data.end_pos = second_pos
		} else {
			selection_data.start_line = second_line
			selection_data.start_pos = second_pos
			selection_data.end_line = first_line
			selection_data.end_pos = first_pos
		}
		
	} else if(first_line < second_line) {
		selection_data.start_line = first_line
		selection_data.start_pos = first_pos
		selection_data.end_line = second_line
		selection_data.end_pos = second_pos
	} else {
		selection_data.start_line = second_line
		selection_data.start_pos = second_pos
		selection_data.end_line = first_line
		selection_data.end_pos = first_pos
	}
}

function set_caret(line_no, caret_position) {
	var range = document.createRange()
	var sel = window.getSelection()
	
	if(codetext[line_no].length == 0) {
		range.setStart(code_line_elements[line_no], 0)
	} else if(codetext[line_no].length < caret_position) {
		range.setStart(code_line_elements[line_no].firstChild, codetext[line_no].length)
	} else {
		range.setStart(code_line_elements[line_no].firstChild, caret_position)
	}
	
	range.collapse(true)
	sel.removeAllRanges()
	sel.addRange(range)
}
function set_range(start_line, end_line, start_pos, end_pos) {
	var range = document.createRange()
	var sel = window.getSelection()
	range.setStart(code_line_elements[start_line].firstChild, start_pos)
	range.setEnd(code_line_elements[end_line].firstChild, end_pos)
	sel.removeAllRanges()
	sel.addRange(range)
}
