package main

import (
	"fmt"
	"log"
	"net/url"

	_ "github.com/go-sql-driver/mysql"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type User struct {
	ID    uint   `gorm:"primaryKey"`
	Name  string
	Email string
}

func main() {
	username := "sql12794681"
	rawPassword := "eYCvw4Gty2"
	password := url.QueryEscape(rawPassword) 
	host := "sql12.freesqldatabase.com"
	port := "3306"
	dbname := "sql12794681"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		username, password, host, port, dbname)

	// Connect using GORM
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	fmt.Println("✅ Connected to MySQL via GORM!")

	// Auto-create table if not exists
	// db.AutoMigrate(&User{})

	// // Insert sample data
	// db.Create(&User{Name: "Alice", Email: "alice@example.com"})

	// Query all users
	var users []User
	users=getAll(db)
	for _, u := range users {
		fmt.Printf("- %d: %s (%s)\n", u.ID, u.Name, u.Email)
	}
	if err=deleteUser(db,2);err!=nil {
		log.Fatal(err)
	}
	users=getAll(db)
	fmt.Println("Users in DB:")
	for _, u := range users {
		fmt.Printf("- %d: %s (%s)\n", u.ID, u.Name, u.Email)
	}
	
}
func getAll(db *gorm.DB) []User{
	var users []User
	db.Find(&users)
	// db.Update({})
	return users
}
func createUser(db *gorm.DB, name, email string) (*User, error) {
    user := &User{Name: name, Email: email}
    result := db.Create(user)
    return user, result.Error
}

func getUser(db *gorm.DB, id uint) (*User, error) {
    var user User
    result := db.First(&user, id)
    return &user, result.Error
}

func updateUserEmail(db *gorm.DB, id uint, newEmail string) error {
    result := db.Model(&User{}).Where("id = ?", id).Update("email", newEmail)
    return result.Error
}

func deleteUser(db *gorm.DB, id uint) error {
    result := db.Delete(&User{}, id)
    return result.Error
}
