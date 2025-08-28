package s1t4

import (
	"log"

	"github.com/gin-gonic/gin"
)

func MW(name string) gin.HandlerFunc {
    return func(c *gin.Context) {
        log.Println(name, "pre")
        c.Next()
        log.Println(name, "post")
    }
}

func Main() {
    r := gin.New()

    // Global middleware
    r.Use(MW("Global-A"), MW("Global-B"))

    api := r.Group("/api")
    api.Use(MW("Group-C"))

    api.GET("/test", MW("Route-D"), func(c *gin.Context) {
        log.Println("Handler")
        c.String(200, "OK")
    })
	api.GET("/", func(c *gin.Context) {
    c.String(200, "API root")
})

    r.Run(":8000")
}
