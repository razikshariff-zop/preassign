package services

import (
    "main/models"

    "gorm.io/gorm"
)

type UserService struct {
    db *gorm.DB
}


func NewUserService(db *gorm.DB) *UserService {
    return &UserService{db: db}
}

// In services/user_service.go

func (s *UserService) GetAllPaginated(page, limit int, sort string) ([]models.User, error) {
	var users []models.User

	if page < 1 {
		page = 1
	}
	if limit <= 0 {
		limit = 10 // default page size
	}

	offset := (page - 1) * limit

	query := s.db.Limit(limit).Offset(offset)

	if sort != "" {
		query = query.Order(sort)
	}

	if err := query.Find(&users).Error; err != nil {
		return nil, err
	}

	return users, nil
}


func (s *UserService) AddUser(user models.User) (models.User, error) {
    result := s.db.Create(&user)
    return user, result.Error
}

func (s *UserService) GetUserByID(id uint) (models.User, error) {
    var user models.User
    result := s.db.First(&user, id)
    return user, result.Error
}

func (s *UserService) UpdateUser(id uint, user models.User) (models.User, error) {
    var existing models.User
    if err := s.db.First(&existing, id).Error; err != nil {
        return models.User{}, err
    }
    existing.Name = user.Name
    existing.Email = user.Email
    s.db.Save(&existing)
    return existing, nil
}

// Delete user
func (s *UserService) DeleteUser(id uint) error {
    return s.db.Delete(&models.User{}, id).Error
}
