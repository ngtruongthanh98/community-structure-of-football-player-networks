package model

type RecommendedPlayer struct {
	Id   int64  `json:"id"`
	Name string `json:"name"`
}

func GetRecommendedPlayerByName(subName string) []*RecommendedPlayer {

	return []*RecommendedPlayer{
		{
			Id:   1,
			Name: "Cristinao Ronaldo",
		},
		{
			Id:   2,
			Name: "Cristinao Ronaldo2",
		},
		{
			Id:   3,
			Name: "Cristinao Ronaldo3",
		},
		{
			Id:   4,
			Name: "Cristinao Ronaldo4",
		},
		{
			Id:   5,
			Name: "Cristinao Ronaldo5",
		},
		{
			Id:   6,
			Name: "Cristinao Ronaldo6",
		},
	}
}
