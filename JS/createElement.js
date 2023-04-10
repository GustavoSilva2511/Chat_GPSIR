function CE(elem, identify, type, content) {
    let element = document.createElement(elem);
    if (type == "id") {
        element.id = identify;
    } else {
        element.className = identify;
    }

    if (content) {
        element.textContent = content;
    }

    return element

}







