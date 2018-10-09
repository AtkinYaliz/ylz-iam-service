export default Object.freeze({
   test: {
      id: {
         errorMessage: "id is required",
         in: ["body"],
         isInt: true
      },
   },
   getAll: {
      name: {
         errorMessage: "name is required",
         in: ["body"],
         isLength: {
           options: { min: 5 },
           errorMessage: "name is required"
         }
      },
   }
});
