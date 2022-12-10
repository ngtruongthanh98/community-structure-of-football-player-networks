package model

import (
	"encoding/csv"
	"log"
	"os"
	"strconv"
	"strings"
)

type RecommendedPlayer struct {
	Id   int64  `json:"id"`
	Name string `json:"name"`
}

type Attribute struct {
	Name  string `json:"name"`
	Value int64  `json:"value"`
}

type Player struct {
	Id         string      `json:"id"`
	Name       string      `json:"name"`
	Height     int64       `json:"height"`
	Weight     int64       `json:"weight"`
	Birth      string      `json:"birth"`
	Positions  []string    `json:"positions"`
	Attributes []Attribute `json:"attributes"`
}

var (
	playerName    []RecommendedPlayer
	attributeName []string
)

func init() {
	filePath := "../dataset.csv"
	f, err := os.Open(filePath)
	if err != nil {
		log.Fatal("Unable to read input file "+filePath, err)
	}
	defer f.Close()

	playerName = make([]RecommendedPlayer, 0)
	attributeName = make([]string, 0)

	csvReader := csv.NewReader(f)
	records, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal("Unable to parse file as CSV for "+filePath, err)
	}

	log.Print(len(records[0]))

	for _, ele := range records[0] {
		attributeName = append(attributeName, ele)
	}

	for index, element := range records {
		if index == 0 {
			continue
		}

		i, _ := strconv.ParseInt(element[0], 10, 64)
		playerName = append(playerName, RecommendedPlayer{
			Id:   i,
			Name: element[1],
		})

		if index >= 1000 {
			break
		}
	}
}

func GetRecommendedPlayerByName(subName string) []RecommendedPlayer {
	var res []RecommendedPlayer
	res = make([]RecommendedPlayer, 0)

	log.Print("GetRecommendedPlayerByName Subname: " + subName)
	for _, ele := range playerName {
		if strings.Contains(ele.Name, subName) {
			res = append(res, ele)
		}
	}

	return res
}

func GetPlayerByID(id string) Player {
	var res Player
	filePath := "../dataset.csv"
	f, err := os.Open(filePath)
	if err != nil {
		log.Fatal("Unable to read input file "+filePath, err)
	}
	defer f.Close()

	_id, _ := strconv.ParseInt(id, 10, 64)

	csvReader := csv.NewReader(f)
	records, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal("Unable to parse file as CSV for "+filePath, err)
	}

	for index, ele := range playerName {
		if ele.Id == _id {
			playerInfo := records[index]
			res.Id = playerInfo[0]
			res.Name = playerInfo[1]
			res.Birth = playerInfo[3]
			res.Height, _ = strconv.ParseInt(playerInfo[9], 10, 64)
			res.Weight, _ = strconv.ParseInt(playerInfo[10], 10, 64)
			res.Positions = strings.FieldsFunc(playerInfo[73], func(r rune) bool {
				return r == '/' || r == ' '
			})

			var att []Attribute = make([]Attribute, 0)
			for i := 13; i < 20; i++ {

				val, _ := strconv.ParseInt(playerInfo[i], 10, 64)
				att = append(att, Attribute{
					Name:  attributeName[i],
					Value: val,
				})
			}
			res.Attributes = att
			break
		}
	}

	return res
}
