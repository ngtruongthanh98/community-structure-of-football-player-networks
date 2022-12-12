package model

import (
	ex "community-structure/grpc"
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
	Similarity float64     `json:"similarity"`
}

type SimilarPlayerByID struct {
	Name          string   `json:"name"`
	SimilarPlayer []Player `json:"similarPlayer"`
	GraphURL      string   `json:"graphURL"`
}

var (
	playerName    []RecommendedPlayer
	attributeName map[string]int64

	mapConversionIndex2ID map[int64]string
	mapConversionID2Index map[string]int64
)

func init() {
	mapConversionID2Index = make(map[string]int64, 0)
	mapConversionIndex2ID = make(map[int64]string, 0)
	filePath := "../dataset3.csv"
	f, err := os.Open(filePath)
	if err != nil {
		log.Fatal("Unable to read input file "+filePath, err)
	}
	defer f.Close()

	playerName = make([]RecommendedPlayer, 0)
	attributeName = make(map[string]int64)

	csvReader := csv.NewReader(f)
	records, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal("Unable to parse file as CSV for "+filePath, err)
	}

	log.Print(len(records[0]))

	for idx, ele := range records[0] {
		// attributeName = append(attributeName, ele)
		attributeName[ele] = int64(idx)
	}

	records = records[1:]
	log.Print(records[0])

	for index, element := range records {
		// log.Println(index)
		mapConversionID2Index[element[0]] = int64(index)
		mapConversionIndex2ID[int64(index)] = element[0]
		i, _ := strconv.ParseInt(element[0], 10, 64)
		playerName = append(playerName, RecommendedPlayer{
			Id:   i,
			Name: element[2],
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
	log.Print(playerName)
	for _, ele := range playerName {
		if strings.Contains(ele.Name, subName) {
			res = append(res, ele)
		}
	}

	return res
}

func GetPlayerByID(id string) Player {
	var res Player
	filePath := "../dataset3.csv"
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
	records = records[1:]

	for _, ele := range playerName {
		if ele.Id == _id {
			playerInfo := records[ele.Id]
			res.Id = playerInfo[0]
			res.Name = playerInfo[2]
			res.Birth = playerInfo[4]
			res.Height, _ = strconv.ParseInt(playerInfo[6], 10, 64)
			res.Weight, _ = strconv.ParseInt(playerInfo[7], 10, 64)
			res.Positions = strings.FieldsFunc(playerInfo[len(playerInfo)-1], func(r rune) bool {
				return r == '/' || r == ' ' || r == ','
			})

			att, err := ex.ExchangeGraphClientInstance().GetBestAttributesByPlayerID(id)
			if err != nil {
				log.Fatal(err)
				return res
			}
			var at []Attribute = make([]Attribute, 0)
			for _, attri := range att.Attributes {

				val, _ := strconv.ParseInt(playerInfo[attributeName[attri.Name]], 10, 64)
				at = append(at, Attribute{
					Name:  attri.Name,
					Value: val,
				})
			}
			res.Attributes = at
			break
		}
	}

	return res
}

func GetSimilarPlayerList(id, algo string) SimilarPlayerByID {
	var res SimilarPlayerByID

	res = SimilarPlayerByID{
		Name: "Phan Gia Anh",
		SimilarPlayer: []Player{
			{
				Name:       "Doan Tran Cao Tri",
				Id:         "DTCT",
				Height:     180,
				Weight:     70,
				Similarity: 0.9,
			},
			{
				Name:       "Nguyen Duc Phu",
				Id:         "NDP",
				Height:     180,
				Weight:     70,
				Similarity: 0.89,
			},
			{
				Name:       "Vu Phuong Thao",
				Id:         "VPT",
				Height:     180,
				Weight:     70,
				Similarity: 0.88,
			},
			{
				Name:       "Nguyen Truong Thanh",
				Id:         "NTT",
				Height:     180,
				Weight:     70,
				Similarity: 0.87,
			},
		},

		GraphURL: "/app/graph.png",
	}
	return res
}
