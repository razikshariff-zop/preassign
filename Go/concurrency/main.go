package main

import (
	"fmt"
	"time"
)

func sayHello(){
		fmt.Println("hello")
		time.Sleep(2000*time.Millisecond)
		fmt.Println("conc complete")
}
func sayHi(){
	fmt.Println("concurrently running test")
}
func main()  {
	fmt.Println("Learning concurrency")
	go sayHello()
	sayHi()
	time.Sleep(3000*time.Millisecond)
}