package main

import (
	"math/rand"
	"fmt"
)

func Classical() {
	for i := 0; i < 10; i++ {
		fmt.Println("count: ", i)
	}
}

func IterStr() {
	str := "Go語"
	for index, runeValue := range str {
		fmt.Printf("index %d, rune %c\n", index, runeValue)
	}
}

func CreateIterInt(N int) []int{
	iter :=[]int{}
	for i:=0;i<N;i++{
		iter=append(iter, rand.Intn(100))
	}
	return iter
}
func IterInterfaces(iter []int)  {
	for i,val:= range iter{
		fmt.Println(i," -> ",val)
	}
}

	

