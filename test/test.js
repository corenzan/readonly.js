const assert = chai.assert;

assert.wouldBeSubmited = (form, name, value) => {
  const data = new FormData(form);
  if (value === undefined) {
    assert.isNotNull(data.get(name));
  } else {
    assert.equal(data.get(name), value);
  }
};

assert.wouldNotBeSubmited = (form, name) => {
  const data = new FormData(form);
  assert.strictEqual(data.get(name), null);
};

describe("readonly", () => {
  it("should be a function", () => {
    assert.isFunction(readonly);
  });

  it("should accept a selector string", () => {
    assert.doesNotThrow(() => readonly("input.non-existing"));
  });

  it("should accept an HTMLElement", () => {
    assert.doesNotThrow(() => readonly(document.createElement("input")));
  });

  it("should accept an NodeList", () => {
    const div = document.createElement("div");
    div.appendChild(document.createElement("input"));
    assert.doesNotThrow(() => readonly(div.querySelectorAll("input")));
  });

  it("should accept an Array of HTMLElement", () => {
    assert.doesNotThrow(() => readonly([document.createElement("input")]));
  });

  it("should whine about invalid arguments", () => {
    assert.throws(() => readonly(), /invalid argument/);
    assert.throws(() => readonly(null), /invalid argument/);
    assert.throws(() => readonly(document.createElement("div")), /not allowed/);
  });

  it("should default to readOnly on text input", () => {
    const input = document.createElement("input");
    input.type = "text";
    readonly(input);
    assert.isTrue(input.readOnly);
    assert.isFalse(input.disabled);
  });

  it("should default to readOnly on textarea", () => {
    const input = document.createElement("input");
    input.type = "text";
    readonly(input);
    assert.isTrue(input.readOnly);
    assert.isFalse(input.disabled);
  });

  it("should whine if control needs a surrogate but has no parent element", () => {
    const select = document.createElement("select");
    assert.throws(() => readonly(select), /parent element/);
  });

  it("should emulate the read-only state on a select", () => {
    const option1 = document.createElement("option");
    option1.textContent = "option1";
    const option2 = document.createElement("option");
    option2.textContent = "option2";

    const select = document.createElement("select");
    select.name = "select";
    select.add(option1);
    select.add(option2);

    const form = document.createElement("form");
    form.appendChild(select);

    readonly(select);

    assert.isTrue(select.hasAttribute("readonly"));
    assert.isTrue(select.hasAttribute("disabled"));
    assert.instanceOf(select.surrogate, HTMLInputElement);
    assert.equal(select.value, select.surrogate.value);

    readonly(select);

    assert.isFalse(select.hasAttribute("readonly"));
    assert.isFalse(select.hasAttribute("disabled"));
    assert.isUndefined(select.surrogate);
  });

  it("should emulate the read-only state on a checkbox", () => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "checkbox";

    const form = document.createElement("form");
    form.appendChild(checkbox);

    readonly(checkbox);

    assert.isTrue(checkbox.hasAttribute("readonly"));
    assert.isTrue(checkbox.hasAttribute("disabled"));
    assert.instanceOf(checkbox.surrogate, HTMLInputElement);
    assert.equal(checkbox.value, checkbox.surrogate.value);
    assert.wouldNotBeSubmited(form, "checkbox");

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event("change"));

    assert.wouldBeSubmited(form, "checkbox");

    readonly(checkbox);

    assert.isFalse(checkbox.hasAttribute("readonly"));
    assert.isFalse(checkbox.hasAttribute("disabled"));
    assert.isUndefined(checkbox.surrogate);
    assert.wouldBeSubmited(form, "checkbox");
  });

  it("should emulate the read-only state on a radio button", () => {
    const radio1 = document.createElement("input");
    radio1.type = "radio";
    radio1.name = "radio";
    radio1.value = "radio1";

    const radio2 = document.createElement("input");
    radio2.type = "radio";
    radio2.name = "radio";
    radio2.value = "radio2";

    const form = document.createElement("form");
    form.appendChild(radio1);
    form.appendChild(radio2);

    readonly(radio1);
    readonly(radio2);

    assert.isTrue(radio1.hasAttribute("readonly"));
    assert.isTrue(radio1.hasAttribute("disabled"));
    assert.isTrue(radio2.hasAttribute("readonly"));
    assert.isTrue(radio2.hasAttribute("disabled"));
    assert.wouldNotBeSubmited(form, "radio");

    radio1.checked = true;
    radio1.dispatchEvent(new Event("change"));
    radio2.dispatchEvent(new Event("change"));

    assert.wouldBeSubmited(form, "radio", "radio1");

    radio2.checked = true;
    radio1.dispatchEvent(new Event("change"));
    radio2.dispatchEvent(new Event("change"));

    assert.wouldBeSubmited(form, "radio", "radio2");

    readonly(radio1);
    readonly(radio2);

    assert.isFalse(radio1.hasAttribute("readonly"));
    assert.isFalse(radio1.hasAttribute("disabled"));
    assert.isFalse(radio2.hasAttribute("readonly"));
    assert.isFalse(radio2.hasAttribute("disabled"));
    assert.wouldBeSubmited(form, "radio", "radio2");
  });

  it("should work with jQuery", () => {
    const input = $('<input type="text">');
    input.readonly();
  });
});
