class ClassBase {
  constructor(data) {
    this.id = data._id;
  }

  withoutId() {
    const object = { ...this };
    Reflect.deleteProperty(object, 'id');
    return object;
  }
}

module.exports = ClassBase;
