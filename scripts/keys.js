"use strict"

function enter_caret(e, index) {
	e.preventDefault()
	var caret_position = selection_data.start_pos
	var newline_text = codetext[index].substr(caret_position)
	codetext[index] = codetext[index].substr(0, caret_position)
	codetext.splice(index + 1, 0, newline_text)
	draw()
	focus_line(index + 1)
}
function backspace_caret(e, index) {
	if(index >= 1 && selection_data.start_pos == 0) {
		e.preventDefault()
		var remaining_text = codetext[index]
		var new_caret_position = codetext[index - 1].length
		codetext[index - 1] = codetext[index - 1] + remaining_text
		codetext.splice(index, 1)
		draw()
		focus_line(index - 1)
		set_caret(index - 1, new_caret_position)
	}
}
function arrowdown_caret(e, index) {
	e.preventDefault()
	var caret_position = selection_data.start_pos
	if(codetext[index + 1]) {
		focus_line(index + 1)
		set_caret(index + 1, caret_position)
	}
}
function arrowup_caret(e, index) {
	e.preventDefault()
	var caret_position = selection_data.start_pos
	if(index > 0) {
		focus_line(index - 1)
		set_caret(index - 1, caret_position)
	}
}
function tab_caret(e, index) {
	e.preventDefault()
	var caret_position = selection_data.start_pos
	codetext[index] = "    " + codetext[index]
	draw()
	focus_line(index)
	set_caret(index, caret_position + 4)
}


function any_range(e, index) {
	if(selection_data.start_line < selection_data.end_line) {
		var caret_pos = selection_data.start_pos
		codetext[index] = codetext[index].substr(0, selection_data.start_pos)
		codetext[index] += codetext[selection_data.end_line].substr(selection_data.end_pos)
		codetext.splice(index + 1, selection_data.end_line - selection_data.start_line)
		draw()
		focus_line(index)
		set_caret(index, caret_pos)
	}
}
function enter_range(e, index) {
	if(selection_data.start_line < selection_data.end_line) {
		e.preventDefault()
		codetext[index] = codetext[index].substr(0, selection_data.start_pos)
		codetext[index + 1] = codetext[selection_data.end_line].substr(selection_data.end_pos)
		codetext.splice(index + 2, selection_data.end_line - selection_data.start_line)
		draw()
		focus_line(index + 1)
		set_caret(index + 1, 0)
	} else if(selection_data.start_line == selection_data.end_line) {
		e.preventDefault()
		var new_line_text = codetext[index].substr(selection_data.end_pos)
		codetext[index] = codetext[index].substr(0, selection_data.start_pos)
		codetext.splice(index + 1, 0, new_line_text)
		draw()
		focus_line(index + 1)
		set_caret(index + 1, 0)
	}
}
function backspace_range(e, index) {
	if(selection_data.start_line < selection_data.end_line) {
		e.preventDefault()
		var caret_pos = selection_data.start_pos
		codetext[index] = codetext[index].substr(0, selection_data.start_pos)
		codetext[index] += codetext[selection_data.end_line].substr(selection_data.end_pos)
		codetext.splice(index + 1, selection_data.end_line - selection_data.start_line)
		draw()
		focus_line(index)
		set_caret(index, caret_pos)
	}
}
function arrowupleft_range(e, index) {
	e.preventDefault()
	focus_line(selection_data.start_line)
	set_caret(selection_data.start_line, selection_data.start_pos)
}
function arrowdownright_range(e, index) {
	e.preventDefault()
	focus_line(selection_data.end_line)
	set_caret(selection_data.end_line, selection_data.end_pos)
}
function tab_range(e, index) {
	e.preventDefault()
	for(var i = selection_data.start_line;i <= selection_data.end_line;i++) {
		codetext[i] = "    " + codetext[i]
	}
	draw()
	focus_line(index)
	set_range(
		selection_data.start_line,
		selection_data.end_line,
		selection_data.start_pos + 4,
		selection_data.end_pos + 4
	)
}



// key combinations
function shiftplus_caret(e, index) {
	if(e.key == 'Tab') {
		e.preventDefault()
		var caret_position = selection_data.start_pos
		if(codetext[index].substr(0, 4) === "    ") {
			codetext[index] = codetext[index].substr(4)
			draw()
			focus_line(index)
			set_caret(index, caret_position - 4)
		}
	}
}
function shiftplus_range(e, index) {
	if(e.key == 'Tab') {
		e.preventDefault()
		for(var i = selection_data.start_line;i <= selection_data.end_line;i++) {
			if(codetext[i].substr(0, 4) === "    ") {
				codetext[i] = codetext[i].substr(4)
			}
		}
		draw()
		focus_line(index)
		set_range(
			selection_data.start_line,
			selection_data.end_line,
			0,
			codetext[selection_data.end_line].length
		)
	}
}
function ctrlplus_range(e, index) {
	if(e.keyCode == 88) {
		if(selection_data.start_line < selection_data.end_line) {
			document.execCommand('copy')
			var caret_pos = selection_data.start_pos
			codetext[index] = codetext[index].substr(0, selection_data.start_pos)
			codetext[index] += codetext[selection_data.end_line].substr(selection_data.end_pos)
			codetext.splice(index + 1, selection_data.end_line - selection_data.start_line)
			draw()
			focus_line(index)
			set_caret(index, caret_pos)
		}
	} else if(e.keyCode == 86) {
		if(selection_data.start_line < selection_data.end_line) {
			var caret_pos = selection_data.start_pos
			codetext[index] = codetext[index].substr(0, selection_data.start_pos)
			codetext[index] += codetext[selection_data.end_line].substr(selection_data.end_pos)
			codetext.splice(index + 1, selection_data.end_line - selection_data.start_line)
			draw()
			focus_line(index)
			set_caret(index, caret_pos)
		} else if(selection_data.start_line == selection_data.end_line) {
			var caret_pos = selection_data.start_pos
			codetext[index] = codetext[index].substr(0, selection_data.start_pos) + codetext[index].substr(selection_data.end_pos)
			draw()
			focus_line(index)
			set_caret(index, caret_pos)
		}
	}
}
function paste_code(e, index) {
	e.stopPropagation()
	e.preventDefault()
	update_selection_data()
	var start_caret_pos = selection_data.start_pos
	var new_code = e.clipboardData.getData('Text').split("\n")
	var end_caret_pos = new_code[new_code.length - 1].length
	new_code[0] = codetext[index].substr(0, start_caret_pos) + new_code[0]
	new_code[new_code.length - 1] = new_code[new_code.length - 1] + codetext[index].substr(start_caret_pos)
	codetext.splice(index, 1, ...new_code)
	draw()
	focus_line(index)
	if(new_code.length == 1) {
		set_range(index, index, start_caret_pos, end_caret_pos)
	} else {
		set_range(index, index + new_code.length - 1, start_caret_pos, end_caret_pos)
	}
}
function update_codetext(index) {
	codetext[index] = code_line_elements[index].textContent
}
