
export type TError = {
	message?: string;
	path?: string;
	value?: string;
};


export default abstract class BaseError extends Error {
   constructor(public type: string, public data: TError[], ...params) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor
      super(...params);

      // Maintains proper stack trace for where our error was thrown (only available on V8)
      if (Error.captureStackTrace) {
         Error.captureStackTrace(this, BaseError);
      }
   }
}
