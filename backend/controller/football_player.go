package controller

import (
	"community-structure/model"
	"net/http"

	"github.com/labstack/echo"
)

func GetRecommendedPlayerByName(c echo.Context) error {
	name := c.Param(":name")
	res := model.GetRecommendedPlayerByName(name)
	return c.JSON(http.StatusOK, res)
}
