package main

import (
	"context"
	"net/http"

	"gofr.dev/pkg/gofr"
	gofrHTTP "gofr.dev/pkg/gofr/http"
)

// Middleware to extract headers
func headerMiddleware() gofrHTTP.Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Get header value
			myHeader := r.Header.Get("X-My-Header")

			// Add it to request context
			ctx := context.WithValue(r.Context(), "X-My-Header", myHeader)

			// Pass updated request downstream
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func main() {
	app := gofr.New()

	// Register middleware
	app.UseMiddleware(headerMiddleware())

	// Define a handler that uses the header
	app.GET("/hello", func(ctx *gofr.Context) (interface{}, error) {
		// Retrieve header from context
		headerValue := ctx.Request.Context().Value("X-My-Header")

		return map[string]interface{}{
			"message":      "Hello from GoFr!",
			"X-My-Header":  headerValue,
		}, nil
	})

	// Start server
	app.Run()
}
