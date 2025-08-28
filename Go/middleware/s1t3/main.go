package s1t3

import (
	"log"

	"github.com/gin-gonic/gin"
)


func MW1() gin.HandlerFunc {
    return func(c *gin.Context) {
        log.Println("MW1 pre")
        c.Next()
        log.Println("MW1 post")
    }
}

func MW2() gin.HandlerFunc {
    return func(c *gin.Context) {
        log.Println("MW2 pre")
        c.Next()
        log.Println("MW2 post")
    }
}

func Main() {
    r := gin.New()
    r.Use(MW1(), MW2())

    r.GET("/ok", func(c *gin.Context) {
        log.Println("Handler running")
        c.String(200, "OK")
    })

    r.Run(":8000")
}


