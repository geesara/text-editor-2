"use strict"

function run_code(html_code, css_code, js_code) {
	var iframe = document.getElementById("iframe-preview")
	var iframe_doc = iframe.contentWindow.document
	if(iframe_doc) {
		js_code = `<script>${js_code}</script>`
		css_code = `<style>${css_code}</style>`
		var html_doc = `<html><head>${css_code}</head><body>${html_code}</body>${js_code}</html>`
		iframe_doc.open()
		iframe_doc.write(html_doc)
		iframe_doc.close()
	}
}

function run(){
	run_code(htmlcode.join("\n"), csscode.join("\n"), jscode.join("\n"))
}

document.getElementById("run-btn").addEventListener("click", run)

