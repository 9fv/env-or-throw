const process = require('process')

class EnvOrThrowError extends Error {
  constructor(message) {
    super(message)
  }
}

class EnvOrThrowMissingParameterError extends EnvOrThrowError {
  constructor() {
    super('Environment variable name is not provided')
  }
}


class EnvOrThrowMissingInvalidTypeError extends EnvOrThrowError {
  constructor() {
    super('Environment variable name must be an instance of string')
  }
}

function envOrThrow(name, valueByDefault) {
  if (!name) {
    throw new EnvOrThrowMissingParameterError() 
  }
  if (typeof name === 'string' || name instanceof String) { 
    const value = process.env[name] || valueByDefault
    return value || (() => { throw new Error(`Undefined environment variable: ${name}`)})()
  } 
  throw new EnvOrThrowMissingInvalidTypeError()
}

module.exports = envOrThrow
