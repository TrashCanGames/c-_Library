;
(function(global) {

    var cordova = function(elementIdentifier) {
        return new cordova.init(elementIdentifier);
    }

    var draggingElement = [];

    function setElement(elementIdentifier) {
        var elm = [];
        if (elementIdentifier.includes("#") || elementIdentifier.includes(".")) {
            if (elementIdentifier.includes("#")) {
                var removedTypeIdent = elementIdentifier.substring(1);
                elm.push(document.getElementById(removedTypeIdent));
            }
            if (elementIdentifier.includes(".")) {
                var removedTypeIdent = elementIdentifier.substring(1);
                var elements = document.getElementsByClassName(removedTypeIdent);
                for (i = 0; i < elements.length; i++) {
                    elm.push(elements[i]);
                }
            }
            return elm;
        } else {
            console.log("Wrong sintax on selector");
            return null;
        }
    }

    function taskDrag(e) {
        draggingElement = [];
        draggingElement.push(e.target);
        var index = draggingElement.length - 1;
        e.dataTransfer.setData("index", index);
    }

    function dragOver(e) {
        e.preventDefault();
        addClass(e.target, e.target.getAttribute("hoverclass"));
    }

    function dragLeave(e) {
        removeClass(e.target, e.target.getAttribute("hoverclass"));
    }

    function dragDrop(e) {
        e.preventDefault();
        removeClass(e.target, e.target.getAttribute("hoverclass"));
        if (hasClass(e.target, "cDrop")) {
            e.target.appendChild(draggingElement[e.dataTransfer.getData("index")]);
        }
    }

    function hasClass(el, className) {
        if (el.classList)
            return el.classList.contains(className)
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    }

    function addClass(el, className) {
        if (el.classList)
            el.classList.add(className)
        else if (!hasClass(el, className)) el.className += " " + className
    }

    function removeClass(el, className) {
        if (el.classList)
            el.classList.remove(className)
        else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
            el.className = el.className.replace(reg, ' ')
        }
    }
    cordova.prototype = {
        hide: function() {
            for (i = 0; i < this.element.length; i++) {
                this.element[i].style.display = "none";
            }
            return this;
        },
        show: function() {
            for (i = 0; i < this.element.length; i++) {
                this.element[i].style.display = "block";
            }
            return this;
        },
        delete: function() {
            for (i = 0; i < this.element.length; i++) {
                this.element[i].parentNode.removeChild(this.element[i]);
            }
        },
        draggable: function() {
            for (i = 0; i < this.element.length; i++) {
                this.element[i].setAttribute("draggable", "true");
                this.element[i].addEventListener("dragstart", taskDrag, true);
            }
            return this;
        },
        droppable: function(colorChangeCSS) {
            for (i = 0; i < this.element.length; i++) {
                this.element[i].setAttribute("hoverclass", colorChangeCSS);
                this.element[i].addEventListener("dragover", dragOver, true);
                this.element[i].addEventListener("drop", dragDrop, true);
                this.element[i].addEventListener("dragleave", dragLeave, true);
                addClass(this.element[i], "cDrop");
            }
            return this;
        },
        hasClass: function(className) {
            for (i = 0; i < this.element.length; i++) {
                if (this.element[i].classList) {
                    return this.element[i].classList.contains(className);
                } else {
                    var classList = this.element[i].className.split(" ");
                    for (i = 0; i < classList.length; i++) {
                        if (classList[i] == className) {
                            return true;
                        }
                    }
                    return false;
                }
            }
        },
        addClass: function(className) {
            for (i = 0; i < this.element.length; i++) {
                if (this.element[i].classList) {
                    this.element[i].classList.add(className)
                } else if (!hasClass(this.element[i], className)) {
                    this.element[i].className += " " + className
                }
            }
            return this;
        },
        removeClass: function(className) {
            for (i = 0; i < this.element.length; i++) {
                if (this.element[i].classList) {
                    this.element[i].classList.remove(className)
                } else if (hasClass(this.element[i], className)) {
                    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                    this.element[i].className = this.element[i].className.replace(reg, ' ');
                }
            }
            return this;
        },
        strikeThrough: function() {
            for (i = 0; i < this.element.length; i++) {
                this.element[i].style.setProperty("text-decoration", "line-through");
            }
            return this;
        },
        clearStrike: function() {
            for (i = 0; i < this.element.length; i++) {
                this.element[i].style.setProperty("text-decoration", "unset");
            }
            return this;
        },
        click: function(action) {
            if (document.addEventListener) {
                for (i = 0; i < this.element.length; i++) {
                    this.element[i].addEventListener("click", action, true);
                }
            } else if (document.attachEvent) {
                for (i = 0; i < this.element.length; i++) {
                    this.element[i].attachEvent("onclick", action);
                }
            }
            return this;
        },
        append: function(element) {
            if (Object.prototype.toString.call(element) === Object.prototype.toString.call([])) {
                for (j = 0; j < element.length; j++) {
                    for (i = 0; i < this.element.length; i++) {
                        this.element[i].appendChild(element[j]);
                    }
                }
            } else {
                for (i = 0; i < this.element.length; i++) {
                    this.element[i].appendChild(element);
                }
            }
            return this;
        },
        returnJSObj: function() {
            if (this.element.length > 1) {
                return this.element;
            } else {
                return this.element[0];
            }
        }
    };

    cordova.init = function(elementIdentifier) {
        var self = this;
        if (elementIdentifier !== null && typeof elementIdentifier === 'object') {
            var elm = [];
            if (Object.prototype.toString.call(elementIdentifier) === Object.prototype.toString.call([])) {
                for (j = 0; j < elementIdentifier.length; j++) {
                    elm.push(elementIdentifier[j]);
                }
            } else {
                elm.push(elementIdentifier);
            }
            self.element = elm;
        } else {
            self.element = setElement(elementIdentifier);
        }
    }

    cordova.init.prototype = cordova.prototype;

    global.cordova = global.c$ = cordova;

}(window));