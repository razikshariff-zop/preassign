package main

import (
	"fmt"
	"math"
	"strings"
)

func main() {
	// fmt.Println("Started")
	// Classical()
	// IterStr()

	// IterInterfaces(CreateIterInt(10))

	// fmt.Println(
	// 	pow(3, 2, 10),
	// 	pow(3, 3, 20),
	// )
	// Abs()
	// p := Person{Age: 10, Name: "Razik"}
	// fmt.Println(p.Age)
	// p.incAge()
	// fmt.Println(p.Age)
	//  s:=fmt.Sprintf("INSERT INTO customers VALUES()")
	w:=	strings.TrimRight(strings.Repeat("?,",5), ",")
	fmt.Printf("%T",w)
}

func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	}
	return lim
}

func Abs() {
	i := math.Abs(-math.Sqrt2)
	fmt.Print(i)
}

type Person struct {
	Age  int    `json:"age,omitempty"`
	Name string `json:"name,omitempty"`
}

func (p *Person) incAge() {
	p.Age++
}
func (p Person) GetData() (int, string) {
	return p.Age, p.Name
}
