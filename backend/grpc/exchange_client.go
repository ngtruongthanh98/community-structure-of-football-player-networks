package grpc

import (
	context "context"
	"log"
	"sync"
	"time"

	"github.com/golang/glog"
	grpcpool "github.com/processout/grpc-go-pool"
	grpc "google.golang.org/grpc"
)

const (
	ExchangeClientTimeout = 20
)

var (
	ExchangeGraphClient *ExchangeClient
	ExchangeGraphSync   sync.Once
)

type ExchangeClient struct {
	*grpcpool.Pool
}

type AttributeModel struct {
	Index int64
	Name  string
}

type AttributeResponseModel struct {
	Attributes []AttributeModel
}

func ExchangeGraphClientInstance() *ExchangeClient {
	ExchangeGraphSync.Do(func() {
		ExchangeGraphClient = &ExchangeClient{}
		ExchangeGraphClient.init()
	})

	return ExchangeGraphClient
}

func (e *ExchangeClient) init() {
	var endpoint string = "127.0.0.1:50051"

	var factory grpcpool.Factory
	factory = func() (*grpc.ClientConn, error) {
		conn, err := grpc.Dial(endpoint, grpc.WithInsecure())
		if err != nil {
			glog.Errorf("Failed to start gRPC connection AI Result endpoint: %v", err)
			return nil, err
		}
		glog.Infof("Connected to AI Result service at %s", endpoint)
		return conn, err
	}

	var err error
	e.Pool, err = grpcpool.New(factory, 3, 10, time.Duration(5)*time.Second)
	if err != nil {
		glog.Errorf("Failed to create record service grpc pool: %v", err)
	}
}

func (e *ExchangeClient) GetBestAttributesByPlayerID(id string) (*AttributeResponseModel, error) {
	conn, err := e.Pool.Get(context.Background())
	if err != nil {
		glog.Errorf("GetBestAttributesByPlayerID connection from pool err: %s", err.Error())
		return nil, err
	}
	defer func() {
		conn.Close()
		if r := recover(); r != nil {
			log.Fatal("Recovered in f", r)
		}
	}()

	client := NewPlayerInfoClient(conn.ClientConn)
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(ExchangeClientTimeout)*time.Second)
	defer cancel()

	var result *AttributeResponseModel = &AttributeResponseModel{}
	res, err := client.GetBestAttributesByPlayerID(ctx, &AttributeRequest{
		Id: id,
	})

	if err != nil {
		glog.Errorf("GetBestAttributesByPlayerID ExchangeClient: %s", err.Error())
		return nil, err
	}

	for _, r := range res.Attributes {
		result.Attributes = append(result.Attributes, AttributeModel{
			Index: r.Index,
			Name:  r.Name,
		})
	}

	return result, err

}
