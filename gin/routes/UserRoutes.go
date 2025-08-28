package routes

import (
	"main/controllers"
	"main/services"

	"gofr.dev/pkg/gofr"
	"gorm.io/gorm"
)

func RegisterUserRoutes(app *gofr.App, db *gorm.DB) {
	// Create service with DB
	userService := services.NewUserService(db)

	// Inject into controller
	userController := controllers.NewUserController(userService)

	// Register routes
	
	app.GET("/users", userController.GetAll)
	app.GET("/users/{id}", userController.GetByID)
	app.POST("/users", userController.Create)
	app.PUT("/users/{id}", userController.Update)
	app.DELETE("/users/{id}", userController.Delete)
}
