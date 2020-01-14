// Readonly.js 3.0.3
// The MIT License © 2013 Arthur Corenzan
// More on https://github.com/corenzan/readonly.js
!function (root, undefined) {
  var typesThatNeedSurrogate = ["checkbox", "range", "radio"];
  var allowedNodeNames = ["INPUT", "SELECT", "TEXTAREA"];

  var isCheckable = function isCheckable(target) {
    return target.type === "checkbox" || target.type === "radio";
  };

  var supportsReadOnly = function supportsReadOnly(target) {
    return "readOnly" in target && typesThatNeedSurrogate.indexOf(target.type) < 0;
  };

  var addSurrogate = function addSurrogate(target) {
    var surrogate = document.createElement("input");
    surrogate.type = "hidden";

    surrogate.sync = function (e) {
      surrogate.name = target.name;
      surrogate.value = target.value;

      if (isCheckable(target)) {
        surrogate.disabled = !target.checked;
      }
    };

    surrogate.sync();
    target.addEventListener("change", surrogate.sync);
    target.surrogate = surrogate;
    target.parentElement.insertBefore(surrogate, target.nextElementSibling);
  };

  var removeSurrogate = function removeSurrogate(target) {
    target.removeEventListener("change", target.surrogate.sync);
    target.parentElement.removeChild(target.surrogate);
    delete target.surrogate;
  };

  var setReadOnly = function setReadOnly(target) {
    if (target.hasAttribute("readonly")) {
      return;
    }

    if (supportsReadOnly(target)) {
      target.readOnly = true;
      return;
    }

    if (!target.parentElement) {
      throw Error("readonly-js: control needs a surrogate but has not been inserted into a dom tree yet, i.e. has no parent element");
    }

    target.setAttribute("disabled", "");
    target.setAttribute("readonly", "");
    addSurrogate(target);
  };

  var unsetReadOnly = function unsetReadOnly(target) {
    if (!target.hasAttribute("readonly")) {
      return;
    }

    if (supportsReadOnly(target)) {
      target.readOnly = false;
      return;
    }

    if (!target.parentElement) {
      throw Error("readonly-js: control needs a surrogate but has not been inserted into a dom tree yet, i.e. has no parent element");
    }

    target.removeAttribute("disabled");
    target.removeAttribute("readonly");
    removeSurrogate(target);
  };

  var toggleReadOnly = function toggleReadOnly(target, value) {
    if (value === undefined) {
      value = !target.hasAttribute("readonly");
    }

    if (value) {
      setReadOnly(target);
    } else {
      unsetReadOnly(target);
    }
  };

  var entryPoint = function entryPoint(mixed, value) {
    if (typeof mixed === "string") {
      mixed = document.querySelectorAll(mixed);
    } else if (mixed instanceof NodeList) {
      mixed = [].slice.call(mixed);
    } else if (mixed instanceof HTMLElement) {
      mixed = [mixed];
    } else if (!mixed || !("forEach" in mixed)) {
      throw Error("readonly-js: invalid argument");
    }

    mixed.forEach(function (target) {
      if (allowedNodeNames.indexOf(target.nodeName) < 0) {
        throw Error("readonly-js: element " + target.nodeName + " is not allowed");
      }

      toggleReadOnly(target, value);
    });
  };

  if ("jQuery" in root) {
    root.jQuery.fn.readonly = function (value) {
      return this.each(function (_, element) {
        entryPoint(element, value);
      });
    };
  }

  root.readonly = entryPoint;
}(this);
