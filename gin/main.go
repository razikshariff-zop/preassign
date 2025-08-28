package main

import (
	// "main/middleware"
	config "main/Config"
	"main/models"
	"main/routes"

	"gofr.dev/pkg/gofr"
)

func main() {
	app := gofr.New()
	config.ConnectDB()
	config.DB.AutoMigrate(&models.User{})
	routes.RegisterUserRoutes(app,config.DB)
	app.Run()
}
