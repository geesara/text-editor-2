"use strict"

var htmlcode = [
	"<h1>Hello, world!</h1>",
	"<p>Hello, world!</p>",
	"<p>Sahan Geesara</p>"
]
var csscode = [
	"h1{text-align: center;}",
	"p{text-align: center}"
]
var jscode = [
	"console.log(\"Hello, world!\");"
]

var codetext = htmlcode
var pre_key_event_duartion
var current_code = "html"

var code_line_elements

function draw() {
	var code_lines_list = ""
	var line_nos_list = ""
	codetext.forEach(function(line, index) {
		code_lines_list += "<li><code class=\"code-line\">" + display_code(line) + "</code></li>"
		line_nos_list += "<li><code>" + index + "</code></li>"
	})
	document.getElementById("text-editor-line-nos").innerHTML = line_nos_list
	document.getElementById("text-editor-code-lines").innerHTML = code_lines_list
	
	code_line_elements = document.querySelectorAll("#text-editor-code-lines .code-line")
	code_line_elements.forEach(function(code_line_element, index) {
		code_line_element.addEventListener("mouseup", function(e) { mouse_up_event_handler(e, index) })
		code_line_element.addEventListener("mousedown", function(e) { mouse_down_event_handler(e, index) })
		code_line_element.addEventListener("blur", function(e) { blur_event_handler(e, index) })
		code_line_element.addEventListener("keydown", function(e) { keydown_event_handler(e, index) })
		code_line_element.addEventListener("keyup", function(e) { keyup_event_handler(e, index) })
		code_line_element.addEventListener("keypress", function(e) { keypress_event_handler(e, index) })
		code_line_element.addEventListener("paste", function(e) { paste_event_handler(e, index) })
		code_line_element.line_no = index
	})
}

function display_code(code) {
	var str = code.replaceAll("<", "&lt;")
	str = str.replaceAll(">", "&gt;")
	str = str.replaceAll(" ", "&nbsp;")
	return str
}

draw()
run()
