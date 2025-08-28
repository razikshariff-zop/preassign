package errors

import (
    "net/http"
)

type HTTPError struct {
    StatusCode int
    Msg        string
}

func (e HTTPError) Error() string {
    return e.Msg
}

func New(status int, msg string) HTTPError {
    return HTTPError{
        StatusCode: status,
        Msg:        msg,
    }
}

func NotFound(msg string) HTTPError {
    return New(http.StatusNotFound, msg)
}

func BadRequest(msg string) HTTPError {
    return New(http.StatusBadRequest, msg)
}
func Internal(msg string) HTTPError {
	return New(http.StatusInternalServerError, msg)
}
