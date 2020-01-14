// Readonly.js $npm_package_version
// The MIT License © 2013 Arthur Corenzan
// More on https://github.com/corenzan/readonly.js
!(function(root, undefined) {
  const typesThatNeedSurrogate = ["checkbox", "range", "radio"];
  const allowedNodeNames = ["INPUT", "SELECT", "TEXTAREA"];

  const isCheckable = target => {
    return target.type === "checkbox" || target.type === "radio";
  };

  const supportsReadOnly = target => {
    return (
      "readOnly" in target && typesThatNeedSurrogate.indexOf(target.type) < 0
    );
  };

  const addSurrogate = target => {
    const surrogate = document.createElement("input");
    surrogate.type = "hidden";

    surrogate.sync = e => {
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

  const removeSurrogate = target => {
    target.removeEventListener("change", target.surrogate.sync);
    target.parentElement.removeChild(target.surrogate);
    delete target.surrogate;
  };

  const setReadOnly = target => {
    if (target.hasAttribute("readonly")) {
      return;
    }

    if (supportsReadOnly(target)) {
      target.readOnly = true;
      return;
    }

    if (!target.parentElement) {
      throw Error(
        "readonly-js: control needs a surrogate but has not been inserted into a dom tree yet, i.e. has no parent element"
      );
    }

    target.setAttribute("disabled", "");
    target.setAttribute("readonly", "");

    addSurrogate(target);
  };

  const unsetReadOnly = target => {
    if (!target.hasAttribute("readonly")) {
      return;
    }

    if (supportsReadOnly(target)) {
      target.readOnly = false;
      return;
    }

    if (!target.parentElement) {
      throw Error(
        "readonly-js: control needs a surrogate but has not been inserted into a dom tree yet, i.e. has no parent element"
      );
    }

    target.removeAttribute("disabled");
    target.removeAttribute("readonly");

    removeSurrogate(target);
  };

  const toggleReadOnly = (target, value) => {
    if (value === undefined) {
      value = !target.hasAttribute("readonly");
    }

    if (value) {
      setReadOnly(target);
    } else {
      unsetReadOnly(target);
    }
  };

  const entryPoint = (mixed, value) => {
    if (typeof mixed === "string") {
      mixed = document.querySelectorAll(mixed);
    } else if (mixed instanceof NodeList) {
      mixed = [].slice.call(mixed);
    } else if (mixed instanceof HTMLElement) {
      mixed = [mixed];
    } else if (!mixed || !("forEach" in mixed)) {
      throw Error("readonly-js: invalid argument");
    }

    mixed.forEach(target => {
      if (allowedNodeNames.indexOf(target.nodeName) < 0) {
        throw Error(
          "readonly-js: element " + target.nodeName + " is not allowed"
        );
      }

      toggleReadOnly(target, value);
    });
  };

  if ("jQuery" in root) {
    root.jQuery.fn.readonly = function(value) {
      return this.each((_, element) => {
        entryPoint(element, value);
      });
    };
  }

  root.readonly = entryPoint;
})(this);
