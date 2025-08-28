package controllers

import (
	"fmt"
	"main/models"
	"main/services"
	"strconv"

	"main/errors"
	"gofr.dev/pkg/gofr"
)

type UserController struct {
	service *services.UserService
}

func NewUserController(s *services.UserService) *UserController {
	return &UserController{service: s}
}

func (c *UserController) GetAll(ctx *gofr.Context) (interface{}, error) {
	page, _ := strconv.Atoi(ctx.Param("page"))
	limit, _ := strconv.Atoi(ctx.Param("limit"))
	sort := ctx.Param("sort")

	users, err := c.service.GetAllPaginated(page, limit, sort)
	if err != nil {
		return nil, errors.Internal(fmt.Sprintf("failed to fetch users: %v", err))
	}

	return users, nil
}

func (c *UserController) GetByID(ctx *gofr.Context) (interface{}, error) {
	idStr := ctx.PathParam("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return nil, errors.BadRequest("invalid user id")
	}

	user, err := c.service.GetUserByID(uint(id))
	if err != nil {
		return nil, errors.NotFound(fmt.Sprintf("user %s not found", idStr))
	}

	return user, nil
}

func (c *UserController) Create(ctx *gofr.Context) (interface{}, error) {
	var u models.User
	if err := ctx.Bind(&u); err != nil {
		return nil, errors.BadRequest(fmt.Sprintf("invalid request body: %v", err))
	}
	if u.Name == "" || u.Email == "" {
		return nil, errors.BadRequest("missing required user fields")
	}

	user, err := c.service.AddUser(u)
	if err != nil {
		return nil, errors.Internal(fmt.Sprintf("failed to create user: %v", err))
	}
	return user, nil
}

func (c *UserController) Update(ctx *gofr.Context) (interface{}, error) {
	idStr := ctx.PathParam("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return nil, errors.BadRequest("invalid user id")
	}

	var u models.User
	if err := ctx.Bind(&u); err != nil {
		return nil, errors.BadRequest(fmt.Sprintf("invalid request body: %v", err))
	}

	updatedUser, err := c.service.UpdateUser(uint(id), u)
	if err != nil {
		return nil, errors.NotFound(fmt.Sprintf("user %s not found", idStr))
	}
	return updatedUser, nil
}

func (c *UserController) Delete(ctx *gofr.Context) (interface{}, error) {
	idStr := ctx.PathParam("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return nil, errors.BadRequest("invalid user id")
	}

	if err := c.service.DeleteUser(uint(id)); err != nil {
		return nil, errors.NotFound(fmt.Sprintf("user %s not found", idStr))
	}

	return fmt.Sprintf("user %s deleted", idStr), nil
}
