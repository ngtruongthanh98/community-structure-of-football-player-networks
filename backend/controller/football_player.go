package controller

import (
	"community-structure/model"
	"net/http"

	"github.com/labstack/echo"
)

func GetRecommendedPlayerByName(c echo.Context) error {
	name := c.Param("name")
	res := model.GetRecommendedPlayerByName(name)
	return c.JSON(http.StatusOK, res)
}

func GetPlayerByID(c echo.Context) error {
	id := c.Param("id")
	res := model.GetPlayerByID(id)
	return c.JSON(http.StatusOK, res)
}

func GetSimilarPlayerList(c echo.Context) error {
	playerID := c.Param("playerId")
	algoName := c.Param("algoName")
	res := model.GetSimilarPlayerList(playerID, algoName)
	return c.JSON(http.StatusOK, res)
}
