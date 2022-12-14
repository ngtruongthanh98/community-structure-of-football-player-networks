// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.15.8
// source: exchange.proto

package grpc

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// PlayerInfoClient is the client API for PlayerInfo service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type PlayerInfoClient interface {
	GetRecommendedPlayerByName(ctx context.Context, in *RecommendPlayerRequest, opts ...grpc.CallOption) (*RecommendPlayerResponse, error)
	GetBestAttributesByPlayerID(ctx context.Context, in *AttributeRequest, opts ...grpc.CallOption) (*AttributeResponse, error)
	GetSimilarPlayerList(ctx context.Context, in *GraphByPlayerAndAlgoRequest, opts ...grpc.CallOption) (*GraphByPlayerAndAlgoResponse, error)
}

type playerInfoClient struct {
	cc grpc.ClientConnInterface
}

func NewPlayerInfoClient(cc grpc.ClientConnInterface) PlayerInfoClient {
	return &playerInfoClient{cc}
}

func (c *playerInfoClient) GetRecommendedPlayerByName(ctx context.Context, in *RecommendPlayerRequest, opts ...grpc.CallOption) (*RecommendPlayerResponse, error) {
	out := new(RecommendPlayerResponse)
	err := c.cc.Invoke(ctx, "/PlayerInfo/GetRecommendedPlayerByName", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *playerInfoClient) GetBestAttributesByPlayerID(ctx context.Context, in *AttributeRequest, opts ...grpc.CallOption) (*AttributeResponse, error) {
	out := new(AttributeResponse)
	err := c.cc.Invoke(ctx, "/PlayerInfo/GetBestAttributesByPlayerID", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *playerInfoClient) GetSimilarPlayerList(ctx context.Context, in *GraphByPlayerAndAlgoRequest, opts ...grpc.CallOption) (*GraphByPlayerAndAlgoResponse, error) {
	out := new(GraphByPlayerAndAlgoResponse)
	err := c.cc.Invoke(ctx, "/PlayerInfo/GetSimilarPlayerList", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// PlayerInfoServer is the server API for PlayerInfo service.
// All implementations must embed UnimplementedPlayerInfoServer
// for forward compatibility
type PlayerInfoServer interface {
	GetRecommendedPlayerByName(context.Context, *RecommendPlayerRequest) (*RecommendPlayerResponse, error)
	GetBestAttributesByPlayerID(context.Context, *AttributeRequest) (*AttributeResponse, error)
	GetSimilarPlayerList(context.Context, *GraphByPlayerAndAlgoRequest) (*GraphByPlayerAndAlgoResponse, error)
	mustEmbedUnimplementedPlayerInfoServer()
}

// UnimplementedPlayerInfoServer must be embedded to have forward compatible implementations.
type UnimplementedPlayerInfoServer struct {
}

func (UnimplementedPlayerInfoServer) GetRecommendedPlayerByName(context.Context, *RecommendPlayerRequest) (*RecommendPlayerResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetRecommendedPlayerByName not implemented")
}
func (UnimplementedPlayerInfoServer) GetBestAttributesByPlayerID(context.Context, *AttributeRequest) (*AttributeResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetBestAttributesByPlayerID not implemented")
}
func (UnimplementedPlayerInfoServer) GetSimilarPlayerList(context.Context, *GraphByPlayerAndAlgoRequest) (*GraphByPlayerAndAlgoResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetSimilarPlayerList not implemented")
}
func (UnimplementedPlayerInfoServer) mustEmbedUnimplementedPlayerInfoServer() {}

// UnsafePlayerInfoServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to PlayerInfoServer will
// result in compilation errors.
type UnsafePlayerInfoServer interface {
	mustEmbedUnimplementedPlayerInfoServer()
}

func RegisterPlayerInfoServer(s grpc.ServiceRegistrar, srv PlayerInfoServer) {
	s.RegisterService(&PlayerInfo_ServiceDesc, srv)
}

func _PlayerInfo_GetRecommendedPlayerByName_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RecommendPlayerRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PlayerInfoServer).GetRecommendedPlayerByName(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/PlayerInfo/GetRecommendedPlayerByName",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PlayerInfoServer).GetRecommendedPlayerByName(ctx, req.(*RecommendPlayerRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _PlayerInfo_GetBestAttributesByPlayerID_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(AttributeRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PlayerInfoServer).GetBestAttributesByPlayerID(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/PlayerInfo/GetBestAttributesByPlayerID",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PlayerInfoServer).GetBestAttributesByPlayerID(ctx, req.(*AttributeRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _PlayerInfo_GetSimilarPlayerList_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GraphByPlayerAndAlgoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PlayerInfoServer).GetSimilarPlayerList(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/PlayerInfo/GetSimilarPlayerList",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PlayerInfoServer).GetSimilarPlayerList(ctx, req.(*GraphByPlayerAndAlgoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// PlayerInfo_ServiceDesc is the grpc.ServiceDesc for PlayerInfo service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var PlayerInfo_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "PlayerInfo",
	HandlerType: (*PlayerInfoServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetRecommendedPlayerByName",
			Handler:    _PlayerInfo_GetRecommendedPlayerByName_Handler,
		},
		{
			MethodName: "GetBestAttributesByPlayerID",
			Handler:    _PlayerInfo_GetBestAttributesByPlayerID_Handler,
		},
		{
			MethodName: "GetSimilarPlayerList",
			Handler:    _PlayerInfo_GetSimilarPlayerList_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "exchange.proto",
}
