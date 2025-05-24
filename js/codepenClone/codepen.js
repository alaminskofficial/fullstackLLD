const containers = document.querySelectorAll(".editor-container");
const htmlEditor = document.getElementById("htmlEditor");
const cssEditor = document.getElementById("cssEditor");
const jsEditor = document.getElementById("jsEditor");
const preview = document.getElementById("preview");

function updatePreview() {
    const html = htmlEditor.value;
    const css = `<style>${cssEditor.value}</style>`;
    const js = `<script>${jsEditor.value}<\/script>`;
    const content = html + css + js;
    preview.srcdoc = content;
}
//debouce and throtting implement 
//https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Debounced version of updatePreview
const debouncedUpdatePreview = debounce(updatePreview, 3000);


htmlEditor.addEventListener("input", updatePreview);
cssEditor.addEventListener("input", updatePreview);

// Attach debounced updatePreview to input events for js only 
jsEditor.addEventListener("input", debouncedUpdatePreview);


// htmlEditor.addEventListener("input", updatePreview);
// cssEditor.addEventListener("input", updatePreview);
// jsEditor.addEventListener("input", updatePreview);

function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute("data-theme");
    body.setAttribute("data-theme", current === "light" ? "dark" : "light");
}

let layoutModes = ["layout-column", "layout-row"];
let currentLayout = 0;

function toggleLayout() {
    const editorWrapper = document.getElementById("editorWrapper");
    editorWrapper.classList.remove(...layoutModes);
    currentLayout = (currentLayout + 1) % layoutModes.length;
    editorWrapper.classList.add(layoutModes[currentLayout]);
}


function saveCode() {
    localStorage.setItem("html", htmlEditor.value);
    localStorage.setItem("css", cssEditor.value);
    localStorage.setItem("js", jsEditor.value);
}

function loadCode() {
    htmlEditor.value = localStorage.getItem("html") || "";
    cssEditor.value = localStorage.getItem("css") || "";
    jsEditor.value = localStorage.getItem("js") || "";
    updatePreview();
}

function downloadCode() {
    const html = htmlEditor.value;
    const css = `<style>${cssEditor.value}</style>`;
    const js = `<script>${jsEditor.value}<\/script>`;
    const blob = new Blob([html + css + js], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.html';
    a.click();
    URL.revokeObjectURL(url);
}

window.addEventListener("load", loadCode);