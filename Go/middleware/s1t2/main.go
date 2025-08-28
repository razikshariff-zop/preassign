package s1t2



import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc  {
    return func (c *gin.Context)  {
        tokeh:=c.GetHeader("X-API-KEY")
        if tokeh!="mysecrettoken" {
            c.JSON(http.StatusUnauthorized,gin.H{"Error":"Unauthorised api key"})
            c.Abort()
            return 
        }
        c.Next()
    }
}
func LoggerMiddleware() gin.HandlerFunc{
    return func(ctx *gin.Context) {
    log.Printf("Incoming request: %s    %s",ctx.Request.URL,ctx.Request.Method)
    ctx.Next()
    log.Printf("Completed with status : %d ",ctx.Writer.Status())
}
}

func Main()  {
    r:=gin.Default()
    r.Use(LoggerMiddleware())
    r.GET("/public",func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "This is public"})
	})
    r.GET("/private", AuthMiddleware(),func(ctx *gin.Context) {
        ctx.JSON(200,gin.H{"message": "This is private"})
    })
    r.Run(":8000")

}