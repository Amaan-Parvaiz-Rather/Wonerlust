class ExpressError extends Error {
  constructor(statusCode, _message) {
    super();
    this._message = _message;
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;