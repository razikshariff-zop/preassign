package middleware


import (
	"context"
	"net/http"

	// "gofr.dev/pkg/gofr"
	gofrHTTP "gofr.dev/pkg/gofr/http"
)

const apiKeyHeader = "X-API-KEY"
const validAPIKey = "mysecretapikey123" // ideally from env/config

func APIKeyAuth() gofrHTTP.Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			apiKey := r.Header.Get(apiKeyHeader)

			if apiKey != validAPIKey {
				http.Error(w, "Unauthorized: invalid or missing API key", http.StatusUnauthorized)
				return
			}

			// Store apiKey in context (optional)
			ctx := context.WithValue(r.Context(), apiKeyHeader, apiKey)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
