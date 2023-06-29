function methodNotAllowed(request, response, next) {
    return response.status(405).send({
      message: `${request.method} not allowed for ${request.originalUrl}`,
    });
  }

module.exports = methodNotAllowed;