package controllers

import (
	"gofr.dev/pkg/gofr"
)

type Greeting struct{
	Message string `json:"message"`
}

func GreetHandler(c *gofr.Context) (any,error){
	var greet =Greeting{Message: "Hello Guest, welcome GoFr"}
	return greet,nil
}
func GreetByName(c *gofr.Context) (any,error){
	name:=c.PathParam("name")
	msg:="Hello "+name+" ,welcome GoFr"
	return Greeting{Message: msg},nil
}

