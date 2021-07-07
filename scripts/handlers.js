"use strict"

function mouse_up_event_handler(e, index) {
	update_selection_data()
	focus_line(index)
}
function mouse_down_event_handler(e, index) {
	unfocus_line(index)
}
function blur_event_handler(e, index) {
	unfocus_line(index)
}
function keydown_event_handler(e, index) {
	update_selection_data()
	update_codetext(index)
	if(!selection_data.is_collapsed) {
		if(e.ctrlKey) { ctrlplus_range(e, index) }
		else if(e.shiftKey) { shiftplus_range(e, index) }
		else if(e.key == 'Backspace') { backspace_range(e, index) }
		else if(e.key == 'ArrowUp' || e.key == 'ArrowLeft') { arrowupleft_range(e, index) }
		else if(e.key == 'ArrowDown' || e.key == 'ArrowRight') { arrowdownright_range(e, index) }
		else if(e.key == 'Tab') { tab_range(e, index) }
	} else {
		if(e.shiftKey) { shiftplus_caret(e, index) }
		else if(e.key == 'Backspace') { backspace_caret(e, index) }
		else if(e.key == 'ArrowDown') { arrowdown_caret(e, index) }
		else if(e.key == 'ArrowUp') { arrowup_caret(e, index) }
		else if(e.key == 'Tab') { tab_caret(e, index) }
	}
}
function keypress_event_handler(e, index) {
	if(!selection_data.is_collapsed) {
		if(e.key == 'Enter') { enter_range(e, index) }
		else { any_range(e, index) }
	} else {
		if(e.key == 'Enter') { enter_caret(e, index) }
	}
}
function keyup_event_handler(e, index) {
	//update_selection_data()
	update_codetext(index)
}

function paste_event_handler(e, index) {
	paste_code(e, index)
}



function focus_line(line_no) {
	var code_line_element = code_line_elements[line_no]
	code_line_element.contentEditable = true
	code_line_element.style.backgroundColor = "#eee"
	code_line_element.focus()
}

function unfocus_line(line_no) {
	var code_line_element = code_line_elements[line_no]
	code_line_element.contentEditable = false
	code_line_element.style.backgroundColor = "#fff"
}

