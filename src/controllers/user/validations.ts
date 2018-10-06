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
           errorMessage: "name is required",
           options: { min: 5 }
         }
      },
   }
});
