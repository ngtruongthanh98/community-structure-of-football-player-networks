from concurrent import futures
import graph

import pandas as pd
import logging
import grpc
import exchange_pb2
import exchange_pb2_grpc


class PlayerInfoServicer(exchange_pb2_grpc.PlayerInfoServicer):
    def __init__(self):
        pass

    def GetBestAttributesByPlayerID(self, request, context):
        using_mental_attr = True
        threshold_for_pos_familarity = 15
        corr_threshold = 0.7
        number_of_attribute = 7
        dataset_2 = pd.read_csv('../dataset2.csv')
        player = dataset_2.loc[int(request.id), :]
        positions = dataset_2.columns[-15:].tolist()
        print(player)
        main_pos = graph.get_player_main_position(player, positions)
        print("Player main position is: ", ','.join(main_pos))

        dataset_3 = pd.read_csv('../dataset3.csv')
        i = 0
        res = exchange_pb2.AttributeResponse()
        for pos in main_pos:
            corr_matrix = graph.get_corr_matrix_for_pos(dataset_3, main_pos[0], threshold_for_pos_familarity, using_mental_attr)
            high_corr_attr = graph.get_relevant_attr(corr_matrix, corr_threshold)
            print(high_corr_attr)
            high_corr_group = graph.get_relevant_group(high_corr_attr)
            recommend_att = graph.get_player_feature(player, high_corr_group, using_mental_attr, number_of_attribute)
            print(f"Recommended attributes for {pos}: ", recommend_att)
            i += 1
            for i in recommend_att:
                res.attributes.add(index=0, name=i)

        return res


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    exchange_pb2_grpc.add_PlayerInfoServicer_to_server(PlayerInfoServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()
    pass


if __name__ == '__main__':
    logging.basicConfig()
    graph.InitData()
    serve()