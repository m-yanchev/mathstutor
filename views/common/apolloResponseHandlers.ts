export const getFirstErrorType = response => {
    return (response && response.errors && response.errors[0]) ? response.error[0].extensions.code : null
}