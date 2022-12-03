from concurrent import futures

import logging
import grpc
import exchange_pb2
import exchange_pb2_grpc


class PlayerInfoServicer(exchange_pb2_grpc.PlayerInfoServicer):
    def __init__(self):
        pass




def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    exchange_pb2_grpc.add_PlayerInfoServicer_to_server(PlayerInfoServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()
    pass


if __name__ == '__main__':
    logging.basicConfig()
    serve()