// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v3.15.8
// source: exchange.proto

package grpc

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type RecommendPlayerRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
}

func (x *RecommendPlayerRequest) Reset() {
	*x = RecommendPlayerRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_exchange_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RecommendPlayerRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RecommendPlayerRequest) ProtoMessage() {}

func (x *RecommendPlayerRequest) ProtoReflect() protoreflect.Message {
	mi := &file_exchange_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RecommendPlayerRequest.ProtoReflect.Descriptor instead.
func (*RecommendPlayerRequest) Descriptor() ([]byte, []int) {
	return file_exchange_proto_rawDescGZIP(), []int{0}
}

func (x *RecommendPlayerRequest) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

type RecommendPlayerResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Players []*RecommendPlayerResponse_RecommendPLayer `protobuf:"bytes,1,rep,name=players,proto3" json:"players,omitempty"`
}

func (x *RecommendPlayerResponse) Reset() {
	*x = RecommendPlayerResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_exchange_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RecommendPlayerResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RecommendPlayerResponse) ProtoMessage() {}

func (x *RecommendPlayerResponse) ProtoReflect() protoreflect.Message {
	mi := &file_exchange_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RecommendPlayerResponse.ProtoReflect.Descriptor instead.
func (*RecommendPlayerResponse) Descriptor() ([]byte, []int) {
	return file_exchange_proto_rawDescGZIP(), []int{1}
}

func (x *RecommendPlayerResponse) GetPlayers() []*RecommendPlayerResponse_RecommendPLayer {
	if x != nil {
		return x.Players
	}
	return nil
}

type AttributeRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
}

func (x *AttributeRequest) Reset() {
	*x = AttributeRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_exchange_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AttributeRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AttributeRequest) ProtoMessage() {}

func (x *AttributeRequest) ProtoReflect() protoreflect.Message {
	mi := &file_exchange_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AttributeRequest.ProtoReflect.Descriptor instead.
func (*AttributeRequest) Descriptor() ([]byte, []int) {
	return file_exchange_proto_rawDescGZIP(), []int{2}
}

func (x *AttributeRequest) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

type AttributeResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Attributes []*AttributeResponse_Attribute `protobuf:"bytes,1,rep,name=attributes,proto3" json:"attributes,omitempty"`
}

func (x *AttributeResponse) Reset() {
	*x = AttributeResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_exchange_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AttributeResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AttributeResponse) ProtoMessage() {}

func (x *AttributeResponse) ProtoReflect() protoreflect.Message {
	mi := &file_exchange_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AttributeResponse.ProtoReflect.Descriptor instead.
func (*AttributeResponse) Descriptor() ([]byte, []int) {
	return file_exchange_proto_rawDescGZIP(), []int{3}
}

func (x *AttributeResponse) GetAttributes() []*AttributeResponse_Attribute {
	if x != nil {
		return x.Attributes
	}
	return nil
}

type GraphByPlayerAndAlgoRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id        string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Algorithm string `protobuf:"bytes,2,opt,name=algorithm,proto3" json:"algorithm,omitempty"`
}

func (x *GraphByPlayerAndAlgoRequest) Reset() {
	*x = GraphByPlayerAndAlgoRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_exchange_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GraphByPlayerAndAlgoRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GraphByPlayerAndAlgoRequest) ProtoMessage() {}

func (x *GraphByPlayerAndAlgoRequest) ProtoReflect() protoreflect.Message {
	mi := &file_exchange_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GraphByPlayerAndAlgoRequest.ProtoReflect.Descriptor instead.
func (*GraphByPlayerAndAlgoRequest) Descriptor() ([]byte, []int) {
	return file_exchange_proto_rawDescGZIP(), []int{4}
}

func (x *GraphByPlayerAndAlgoRequest) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *GraphByPlayerAndAlgoRequest) GetAlgorithm() string {
	if x != nil {
		return x.Algorithm
	}
	return ""
}

type GraphByPlayerAndAlgoResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Similars []*GraphByPlayerAndAlgoResponse_SimilarPlayer `protobuf:"bytes,1,rep,name=similars,proto3" json:"similars,omitempty"`
	Procs    []*GraphByPlayerAndAlgoResponse_Execution     `protobuf:"bytes,2,rep,name=procs,proto3" json:"procs,omitempty"`
	Url      string                                        `protobuf:"bytes,3,opt,name=url,proto3" json:"url,omitempty"`
}

func (x *GraphByPlayerAndAlgoResponse) Reset() {
	*x = GraphByPlayerAndAlgoResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_exchange_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GraphByPlayerAndAlgoResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GraphByPlayerAndAlgoResponse) ProtoMessage() {}

func (x *GraphByPlayerAndAlgoResponse) ProtoReflect() protoreflect.Message {
	mi := &file_exchange_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GraphByPlayerAndAlgoResponse.ProtoReflect.Descriptor instead.
func (*GraphByPlayerAndAlgoResponse) Descriptor() ([]byte, []int) {
	return file_exchange_proto_rawDescGZIP(), []int{5}
}

func (x *GraphByPlayerAndAlgoResponse) GetSimilars() []*GraphByPlayerAndAlgoResponse_SimilarPlayer {
	if x != nil {
		return x.Similars
	}
	return nil
}

func (x *GraphByPlayerAndAlgoResponse) GetProcs() []*GraphByPlayerAndAlgoResponse_Execution {
	if x != nil {
		return x.Procs
	}
	return nil
}

func (x *GraphByPlayerAndAlgoResponse) GetUrl() string {
	if x != nil {
		return x.Url
	}
	return ""
}

type RecommendPlayerResponse_RecommendPLayer struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id   int64  `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	Name string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
}

func (x *RecommendPlayerResponse_RecommendPLayer) Reset() {
	*x = RecommendPlayerResponse_RecommendPLayer{}
	if protoimpl.UnsafeEnabled {
		mi := &file_exchange_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RecommendPlayerResponse_RecommendPLayer) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RecommendPlayerResponse_RecommendPLayer) ProtoMessage() {}

func (x *RecommendPlayerResponse_RecommendPLayer) ProtoReflect() protoreflect.Message {
	mi := &file_exchange_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RecommendPlayerResponse_RecommendPLayer.ProtoReflect.Descriptor instead.
func (*RecommendPlayerResponse_RecommendPLayer) Descriptor() ([]byte, []int) {
	return file_exchange_proto_rawDescGZIP(), []int{1, 0}
}

func (x *RecommendPlayerResponse_RecommendPLayer) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *RecommendPlayerResponse_RecommendPLayer) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

type AttributeResponse_Attribute struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Index int64  `protobuf:"varint,1,opt,name=index,proto3" json:"index,omitempty"`
	Name  string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
}

func (x *AttributeResponse_Attribute) Reset() {
	*x = AttributeResponse_Attribute{}
	if protoimpl.UnsafeEnabled {
		mi := &file_exchange_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AttributeResponse_Attribute) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AttributeResponse_Attribute) ProtoMessage() {}

func (x *AttributeResponse_Attribute) ProtoReflect() protoreflect.Message {
	mi := &file_exchange_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AttributeResponse_Attribute.ProtoReflect.Descriptor instead.
func (*AttributeResponse_Attribute) Descriptor() ([]byte, []int) {
	return file_exchange_proto_rawDescGZIP(), []int{3, 0}
}

func (x *AttributeResponse_Attribute) GetIndex() int64 {
	if x != nil {
		return x.Index
	}
	return 0
}

func (x *AttributeResponse_Attribute) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

type GraphByPlayerAndAlgoResponse_SimilarPlayer struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Index   string  `protobuf:"bytes,1,opt,name=index,proto3" json:"index,omitempty"`
	Similar float32 `protobuf:"fixed32,2,opt,name=similar,proto3" json:"similar,omitempty"`
}

func (x *GraphByPlayerAndAlgoResponse_SimilarPlayer) Reset() {
	*x = GraphByPlayerAndAlgoResponse_SimilarPlayer{}
	if protoimpl.UnsafeEnabled {
		mi := &file_exchange_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GraphByPlayerAndAlgoResponse_SimilarPlayer) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GraphByPlayerAndAlgoResponse_SimilarPlayer) ProtoMessage() {}

func (x *GraphByPlayerAndAlgoResponse_SimilarPlayer) ProtoReflect() protoreflect.Message {
	mi := &file_exchange_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GraphByPlayerAndAlgoResponse_SimilarPlayer.ProtoReflect.Descriptor instead.
func (*GraphByPlayerAndAlgoResponse_SimilarPlayer) Descriptor() ([]byte, []int) {
	return file_exchange_proto_rawDescGZIP(), []int{5, 0}
}

func (x *GraphByPlayerAndAlgoResponse_SimilarPlayer) GetIndex() string {
	if x != nil {
		return x.Index
	}
	return ""
}

func (x *GraphByPlayerAndAlgoResponse_SimilarPlayer) GetSimilar() float32 {
	if x != nil {
		return x.Similar
	}
	return 0
}

type GraphByPlayerAndAlgoResponse_Execution struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name string  `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	Time float32 `protobuf:"fixed32,2,opt,name=time,proto3" json:"time,omitempty"`
}

func (x *GraphByPlayerAndAlgoResponse_Execution) Reset() {
	*x = GraphByPlayerAndAlgoResponse_Execution{}
	if protoimpl.UnsafeEnabled {
		mi := &file_exchange_proto_msgTypes[9]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GraphByPlayerAndAlgoResponse_Execution) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GraphByPlayerAndAlgoResponse_Execution) ProtoMessage() {}

func (x *GraphByPlayerAndAlgoResponse_Execution) ProtoReflect() protoreflect.Message {
	mi := &file_exchange_proto_msgTypes[9]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GraphByPlayerAndAlgoResponse_Execution.ProtoReflect.Descriptor instead.
func (*GraphByPlayerAndAlgoResponse_Execution) Descriptor() ([]byte, []int) {
	return file_exchange_proto_rawDescGZIP(), []int{5, 1}
}

func (x *GraphByPlayerAndAlgoResponse_Execution) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *GraphByPlayerAndAlgoResponse_Execution) GetTime() float32 {
	if x != nil {
		return x.Time
	}
	return 0
}

var File_exchange_proto protoreflect.FileDescriptor

var file_exchange_proto_rawDesc = []byte{
	0x0a, 0x0e, 0x65, 0x78, 0x63, 0x68, 0x61, 0x6e, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x22, 0x2c, 0x0a, 0x16, 0x52, 0x65, 0x63, 0x6f, 0x6d, 0x6d, 0x65, 0x6e, 0x64, 0x50, 0x6c, 0x61,
	0x79, 0x65, 0x72, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61,
	0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x22, 0x94,
	0x01, 0x0a, 0x17, 0x52, 0x65, 0x63, 0x6f, 0x6d, 0x6d, 0x65, 0x6e, 0x64, 0x50, 0x6c, 0x61, 0x79,
	0x65, 0x72, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x42, 0x0a, 0x07, 0x70, 0x6c,
	0x61, 0x79, 0x65, 0x72, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x28, 0x2e, 0x52, 0x65,
	0x63, 0x6f, 0x6d, 0x6d, 0x65, 0x6e, 0x64, 0x50, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x2e, 0x52, 0x65, 0x63, 0x6f, 0x6d, 0x6d, 0x65, 0x6e, 0x64, 0x50,
	0x4c, 0x61, 0x79, 0x65, 0x72, 0x52, 0x07, 0x70, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x73, 0x1a, 0x35,
	0x0a, 0x0f, 0x52, 0x65, 0x63, 0x6f, 0x6d, 0x6d, 0x65, 0x6e, 0x64, 0x50, 0x4c, 0x61, 0x79, 0x65,
	0x72, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x02, 0x69,
	0x64, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x04, 0x6e, 0x61, 0x6d, 0x65, 0x22, 0x22, 0x0a, 0x10, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75,
	0x74, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x22, 0x88, 0x01, 0x0a, 0x11, 0x41, 0x74,
	0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12,
	0x3c, 0x0a, 0x0a, 0x61, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x18, 0x01, 0x20,
	0x03, 0x28, 0x0b, 0x32, 0x1c, 0x2e, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x2e, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74,
	0x65, 0x52, 0x0a, 0x61, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x1a, 0x35, 0x0a,
	0x09, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x12, 0x14, 0x0a, 0x05, 0x69, 0x6e,
	0x64, 0x65, 0x78, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x05, 0x69, 0x6e, 0x64, 0x65, 0x78,
	0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04,
	0x6e, 0x61, 0x6d, 0x65, 0x22, 0x4b, 0x0a, 0x1b, 0x47, 0x72, 0x61, 0x70, 0x68, 0x42, 0x79, 0x50,
	0x6c, 0x61, 0x79, 0x65, 0x72, 0x41, 0x6e, 0x64, 0x41, 0x6c, 0x67, 0x6f, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x02, 0x69, 0x64, 0x12, 0x1c, 0x0a, 0x09, 0x61, 0x6c, 0x67, 0x6f, 0x72, 0x69, 0x74, 0x68, 0x6d,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x61, 0x6c, 0x67, 0x6f, 0x72, 0x69, 0x74, 0x68,
	0x6d, 0x22, 0xae, 0x02, 0x0a, 0x1c, 0x47, 0x72, 0x61, 0x70, 0x68, 0x42, 0x79, 0x50, 0x6c, 0x61,
	0x79, 0x65, 0x72, 0x41, 0x6e, 0x64, 0x41, 0x6c, 0x67, 0x6f, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x12, 0x47, 0x0a, 0x08, 0x73, 0x69, 0x6d, 0x69, 0x6c, 0x61, 0x72, 0x73, 0x18, 0x01,
	0x20, 0x03, 0x28, 0x0b, 0x32, 0x2b, 0x2e, 0x47, 0x72, 0x61, 0x70, 0x68, 0x42, 0x79, 0x50, 0x6c,
	0x61, 0x79, 0x65, 0x72, 0x41, 0x6e, 0x64, 0x41, 0x6c, 0x67, 0x6f, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x2e, 0x53, 0x69, 0x6d, 0x69, 0x6c, 0x61, 0x72, 0x50, 0x6c, 0x61, 0x79, 0x65,
	0x72, 0x52, 0x08, 0x73, 0x69, 0x6d, 0x69, 0x6c, 0x61, 0x72, 0x73, 0x12, 0x3d, 0x0a, 0x05, 0x70,
	0x72, 0x6f, 0x63, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x27, 0x2e, 0x47, 0x72, 0x61,
	0x70, 0x68, 0x42, 0x79, 0x50, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x41, 0x6e, 0x64, 0x41, 0x6c, 0x67,
	0x6f, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x2e, 0x45, 0x78, 0x65, 0x63, 0x75, 0x74,
	0x69, 0x6f, 0x6e, 0x52, 0x05, 0x70, 0x72, 0x6f, 0x63, 0x73, 0x12, 0x10, 0x0a, 0x03, 0x75, 0x72,
	0x6c, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x75, 0x72, 0x6c, 0x1a, 0x3f, 0x0a, 0x0d,
	0x53, 0x69, 0x6d, 0x69, 0x6c, 0x61, 0x72, 0x50, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x12, 0x14, 0x0a,
	0x05, 0x69, 0x6e, 0x64, 0x65, 0x78, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x69, 0x6e,
	0x64, 0x65, 0x78, 0x12, 0x18, 0x0a, 0x07, 0x73, 0x69, 0x6d, 0x69, 0x6c, 0x61, 0x72, 0x18, 0x02,
	0x20, 0x01, 0x28, 0x02, 0x52, 0x07, 0x73, 0x69, 0x6d, 0x69, 0x6c, 0x61, 0x72, 0x1a, 0x33, 0x0a,
	0x09, 0x45, 0x78, 0x65, 0x63, 0x75, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61,
	0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x12,
	0x0a, 0x04, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x02, 0x52, 0x04, 0x74, 0x69,
	0x6d, 0x65, 0x32, 0xfe, 0x01, 0x0a, 0x0a, 0x50, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x49, 0x6e, 0x66,
	0x6f, 0x12, 0x51, 0x0a, 0x1a, 0x47, 0x65, 0x74, 0x52, 0x65, 0x63, 0x6f, 0x6d, 0x6d, 0x65, 0x6e,
	0x64, 0x65, 0x64, 0x50, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x42, 0x79, 0x4e, 0x61, 0x6d, 0x65, 0x12,
	0x17, 0x2e, 0x52, 0x65, 0x63, 0x6f, 0x6d, 0x6d, 0x65, 0x6e, 0x64, 0x50, 0x6c, 0x61, 0x79, 0x65,
	0x72, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x18, 0x2e, 0x52, 0x65, 0x63, 0x6f, 0x6d,
	0x6d, 0x65, 0x6e, 0x64, 0x50, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x22, 0x00, 0x12, 0x46, 0x0a, 0x1b, 0x47, 0x65, 0x74, 0x42, 0x65, 0x73, 0x74, 0x41,
	0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x42, 0x79, 0x50, 0x6c, 0x61, 0x79, 0x65,
	0x72, 0x49, 0x44, 0x12, 0x11, 0x2e, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x12, 0x2e, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75,
	0x74, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x55, 0x0a, 0x14,
	0x47, 0x65, 0x74, 0x53, 0x69, 0x6d, 0x69, 0x6c, 0x61, 0x72, 0x50, 0x6c, 0x61, 0x79, 0x65, 0x72,
	0x4c, 0x69, 0x73, 0x74, 0x12, 0x1c, 0x2e, 0x47, 0x72, 0x61, 0x70, 0x68, 0x42, 0x79, 0x50, 0x6c,
	0x61, 0x79, 0x65, 0x72, 0x41, 0x6e, 0x64, 0x41, 0x6c, 0x67, 0x6f, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x1a, 0x1d, 0x2e, 0x47, 0x72, 0x61, 0x70, 0x68, 0x42, 0x79, 0x50, 0x6c, 0x61, 0x79,
	0x65, 0x72, 0x41, 0x6e, 0x64, 0x41, 0x6c, 0x67, 0x6f, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x22, 0x00, 0x42, 0x08, 0x5a, 0x06, 0x2e, 0x2f, 0x67, 0x72, 0x70, 0x63, 0x62, 0x06, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_exchange_proto_rawDescOnce sync.Once
	file_exchange_proto_rawDescData = file_exchange_proto_rawDesc
)

func file_exchange_proto_rawDescGZIP() []byte {
	file_exchange_proto_rawDescOnce.Do(func() {
		file_exchange_proto_rawDescData = protoimpl.X.CompressGZIP(file_exchange_proto_rawDescData)
	})
	return file_exchange_proto_rawDescData
}

var file_exchange_proto_msgTypes = make([]protoimpl.MessageInfo, 10)
var file_exchange_proto_goTypes = []interface{}{
	(*RecommendPlayerRequest)(nil),                     // 0: RecommendPlayerRequest
	(*RecommendPlayerResponse)(nil),                    // 1: RecommendPlayerResponse
	(*AttributeRequest)(nil),                           // 2: AttributeRequest
	(*AttributeResponse)(nil),                          // 3: AttributeResponse
	(*GraphByPlayerAndAlgoRequest)(nil),                // 4: GraphByPlayerAndAlgoRequest
	(*GraphByPlayerAndAlgoResponse)(nil),               // 5: GraphByPlayerAndAlgoResponse
	(*RecommendPlayerResponse_RecommendPLayer)(nil),    // 6: RecommendPlayerResponse.RecommendPLayer
	(*AttributeResponse_Attribute)(nil),                // 7: AttributeResponse.Attribute
	(*GraphByPlayerAndAlgoResponse_SimilarPlayer)(nil), // 8: GraphByPlayerAndAlgoResponse.SimilarPlayer
	(*GraphByPlayerAndAlgoResponse_Execution)(nil),     // 9: GraphByPlayerAndAlgoResponse.Execution
}
var file_exchange_proto_depIdxs = []int32{
	6, // 0: RecommendPlayerResponse.players:type_name -> RecommendPlayerResponse.RecommendPLayer
	7, // 1: AttributeResponse.attributes:type_name -> AttributeResponse.Attribute
	8, // 2: GraphByPlayerAndAlgoResponse.similars:type_name -> GraphByPlayerAndAlgoResponse.SimilarPlayer
	9, // 3: GraphByPlayerAndAlgoResponse.procs:type_name -> GraphByPlayerAndAlgoResponse.Execution
	0, // 4: PlayerInfo.GetRecommendedPlayerByName:input_type -> RecommendPlayerRequest
	2, // 5: PlayerInfo.GetBestAttributesByPlayerID:input_type -> AttributeRequest
	4, // 6: PlayerInfo.GetSimilarPlayerList:input_type -> GraphByPlayerAndAlgoRequest
	1, // 7: PlayerInfo.GetRecommendedPlayerByName:output_type -> RecommendPlayerResponse
	3, // 8: PlayerInfo.GetBestAttributesByPlayerID:output_type -> AttributeResponse
	5, // 9: PlayerInfo.GetSimilarPlayerList:output_type -> GraphByPlayerAndAlgoResponse
	7, // [7:10] is the sub-list for method output_type
	4, // [4:7] is the sub-list for method input_type
	4, // [4:4] is the sub-list for extension type_name
	4, // [4:4] is the sub-list for extension extendee
	0, // [0:4] is the sub-list for field type_name
}

func init() { file_exchange_proto_init() }
func file_exchange_proto_init() {
	if File_exchange_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_exchange_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RecommendPlayerRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_exchange_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RecommendPlayerResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_exchange_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AttributeRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_exchange_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AttributeResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_exchange_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GraphByPlayerAndAlgoRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_exchange_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GraphByPlayerAndAlgoResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_exchange_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RecommendPlayerResponse_RecommendPLayer); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_exchange_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AttributeResponse_Attribute); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_exchange_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GraphByPlayerAndAlgoResponse_SimilarPlayer); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_exchange_proto_msgTypes[9].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GraphByPlayerAndAlgoResponse_Execution); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_exchange_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   10,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_exchange_proto_goTypes,
		DependencyIndexes: file_exchange_proto_depIdxs,
		MessageInfos:      file_exchange_proto_msgTypes,
	}.Build()
	File_exchange_proto = out.File
	file_exchange_proto_rawDesc = nil
	file_exchange_proto_goTypes = nil
	file_exchange_proto_depIdxs = nil
}
