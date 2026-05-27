/**
 * Creates a standardized error response object for API responses.
 * @returns Returns a fresh object per invocation to avoid shared mutable state.
 */
const errorResponseBody = () => ({
    err: {},
    data: {},
    message: 'Something went wrong, cannot process the request',
    success: false
});

/**
 * Creates a standardized success response object for API responses.
 * @returns Returns a fresh object per invocation to avoid shared mutable state.
 */
const successResponseBody = () => ({
    err: {},
    data: {},
    message: 'Successfully processed the request',
    success: true
})

module.exports = {
    successResponseBody,
    errorResponseBody
}