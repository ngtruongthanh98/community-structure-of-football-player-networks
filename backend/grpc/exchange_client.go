package grpc

import (
	"sync"
	"time"

	"github.com/golang/glog"
	grpcpool "github.com/processout/grpc-go-pool"
	grpc "google.golang.org/grpc"
)

type ExchangeClient struct {
	*grpcpool.Pool
}

var (
	ExchangeGraphClient *ExchangeClient
	ExchangeGraphSync   sync.Once
)

func ExchangeGraphClientInstance() *ExchangeClient {
	ExchangeGraphSync.Do(func() {

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
