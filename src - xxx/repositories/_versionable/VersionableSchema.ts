// import { Schema } from "mongoose";

// export default class VersionableSchema extends Schema {
//   constructor(options: any, collections: any) {
//     const versionedOptions = Object.assign(
//       {
//         originalId: {
//           type: String,
//           required: true
//         },
//         createdAt: {
//           type: Date,
//           required: true,
//           default: Date.now
//         },
//         deletedAt: {
//           type: Date,
//           default: null
//         }
//       },
//       options
//     );

//     super(versionedOptions, collections);
//   }
// }
