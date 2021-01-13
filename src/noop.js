export default process.env.NODE_ENV === "development"
  ? { render: (h) => h("Component muss in client-only gewrapt werden") }
  : {};
