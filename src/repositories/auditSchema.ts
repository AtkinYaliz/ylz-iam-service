
export default {
   createdAt: {
      type: Date,
      required: [true, 'createdAt is required!'],
      default: () => new Date()
   },
   createdBy: {
      type: String,
      required: [true, 'createdBy is required!'],
      default: '-'
   },
   updatedAt: {
      type: Date,
      required: [true, 'updatedAt is required!'],
      default: () => new Date()
   },
   updatedBy: {
      type: String,
      required: [true, 'updatedBy is required!'],
      default: '-'
   }
};
