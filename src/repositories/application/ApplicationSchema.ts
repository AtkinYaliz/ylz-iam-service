import { SchemaOptions } from "mongoose";
import { BaseSchema } from "@ylz/data-access";
import { auditSchema } from "@ylz/data-access";

export class ApplicationSchema extends BaseSchema {
  constructor(options?: SchemaOptions) {
    const applicationDefinition = {
      _id: String,
      name: {
        type: String,
        trim: true,
        required: [true, "Name is required!"],
        minlength: [2, "Name needs to be at least 2 chars!"]
      },

      ...auditSchema
    };

    super(applicationDefinition, options);
  }
}
