"use strict"

var divider = document.getElementById("editor-iframe-divider")
var shield = document.getElementById("shield")
var html_btn = document.getElementById("html-btn")
var css_btn = document.getElementById("css-btn")
var js_btn = document.getElementById("js-btn")
var mouse_x = 0
var mouse_y = 0

var texteditor_element = document.getElementById("text-editor")
divider.addEventListener("mousedown", function(e) {
	shield.addEventListener("mousemove", dragging)
	shield.style.display = "block"
	divider.style.backgroundColor = "#ddd"
})
shield.addEventListener("mouseup", function(e) {
	shield.removeEventListener("mousemove", dragging)
	shield.style.display = "none"
	divider.style.backgroundColor = "#aaa"
})

document.onmousemove = function(e) {
	mouse_x = e.clientX
	mouse_y = e.clientY
}

function dragging() {
	texteditor_element.style.width = mouse_x - 5
}



html_btn.addEventListener("click", function() {
	codetext = htmlcode
	current_code = "html"
	draw()
	html_btn.style.backgroundColor = "#fff"
	css_btn.style.backgroundColor = "#eee"
	js_btn.style.backgroundColor = "#eee"
})
css_btn.addEventListener("click", function() {
	codetext = csscode
	current_code = "css"
	draw()
	html_btn.style.backgroundColor = "#eee"
	css_btn.style.backgroundColor = "#fff"
	js_btn.style.backgroundColor = "#eee"
})
js_btn.addEventListener("click", function() {
	codetext = jscode
	current_code = "js"
	draw()
	html_btn.style.backgroundColor = "#eee"
	css_btn.style.backgroundColor = "#eee"
	js_btn.style.backgroundColor = "#fff"
})

html_btn.style.backgroundColor = "#fff"
css_btn.style.backgroundColor = "#eee"
js_btn.style.backgroundColor = "#eee"
