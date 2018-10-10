
/**
 * List of Environment Variables
 */
export enum EnvVars {
   TEST = 'test',
   LOCAL = 'local',
   DEV = 'dev',
   PROD = 'prod'
}

/**
 * List of Status Codes
 */
export enum StatusCodes {
   OK = 200,
   CREATED = 201,
   BAD_REQUEST = 400,
   NOT_FOUND = 404,
   UNPROCESSABLE = 422,
   INTERNAL_SERVER_ERROR = 500
}
