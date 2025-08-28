package s1t5

import (
	"main/s1t2"

	"github.com/gin-gonic/gin"
)


func Main() {
    r := gin.New()

    // Public endpoints
	r.Use(s1t2.LoggerMiddleware())
    r.GET("/login", func(c *gin.Context) {
        c.String(200, "Login page")
    })

    // Protected group
    private := r.Group("/private")
    private.Use(s1t2.AuthMiddleware())
    private.GET("/data", func(c *gin.Context) {
        c.String(200, "Sensitive data")
    })

    r.Run(":8000")
}
