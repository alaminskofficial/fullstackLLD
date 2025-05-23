const tabs = document.querySelectorAll(".tab");
const containers = document.querySelectorAll(".editor-container");
const htmlEditor = document.getElementById("htmlEditor");
const cssEditor = document.getElementById("cssEditor");
const jsEditor = document.getElementById("jsEditor");
const preview = document.getElementById("preview");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        containers.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
    });
});

function updatePreview() {
    const html = htmlEditor.value;
    const css = `<style>${cssEditor.value}</style>`;
    const js = `<script>${jsEditor.value}<\/script>`;
    const content = html + css + js;
    preview.srcdoc = content;
}

htmlEditor.addEventListener("input", updatePreview);
cssEditor.addEventListener("input", updatePreview);
jsEditor.addEventListener("input", updatePreview);

function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute("data-theme");
    body.setAttribute("data-theme", current === "light" ? "dark" : "light");
}

let layoutModes = ["layout-column", "layout-row", "layout-grid"];
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