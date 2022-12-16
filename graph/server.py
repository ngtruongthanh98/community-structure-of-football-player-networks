from concurrent import futures
import graph

import pandas as pd
import logging
import grpc
import exchange_pb2
import exchange_pb2_grpc
import datetime
import numpy as np
import random
import networkx as nx
import matplotlib.pyplot as plt

Build_Time = 0

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
        main_pos = [main_pos[0]]
        for pos in main_pos:
            corr_matrix = graph.get_corr_matrix_for_pos(dataset_3, main_pos[i], threshold_for_pos_familarity, using_mental_attr)
            high_corr_attr = graph.get_relevant_attr(corr_matrix, corr_threshold)
            print(high_corr_attr)
            high_corr_group = graph.get_relevant_group(high_corr_attr)
            recommend_att = graph.get_player_feature(player, high_corr_group, using_mental_attr, number_of_attribute)
            print(f"Recommended attributes for {pos}: ", recommend_att)
            i += 1
            for k in recommend_att:
                res.attributes.add(index=0, name=k)

        return res

    def GetSimilarPlayerList(self, request, context):
        global Build_Time
        res = exchange_pb2.GraphByPlayerAndAlgoResponse()
        id = request.id
        algo = request.algorithm
        start = datetime.datetime.now()
        if algo == "Louvain" or algo == "KMeans":
            group = graph.Community_Louvain[int(id)]
            comm = graph.Partition_Louvain[group]

            res.procs.add(name='Build Graph', time=Build_Time)
            res.procs.add(name='Find Community', time=(datetime.datetime.now()-start).microseconds)
            start = datetime.datetime.now()

            # print(comm)
            score_comm = {}
            for node in comm:
                score_comm[node] = graph.Score_Table[int(id), int(node)]
            # print(score_comm)
            best_score_comm = dict(sorted(score_comm.items(), key=lambda item: item[1]))
            best_score_index_ = list(best_score_comm.keys())

            best_score_index = best_score_index_[1:11]
            print(best_score_index)
            # best_score_comm = np.argsort(score_comm)
            # best_score_comm = best_score_comm[1:11]
            max_score = np.max(list(best_score_comm.values()))
            for player in best_score_index:
                res.similars.add(index=str(player), similar=((float)(max_score - best_score_comm[player]))/max_score)
            # print(best_score_comm)

            res.procs.add(name='Get Best Similar', time=(datetime.datetime.now()-start).microseconds)
            start = datetime.datetime.now()

            visualize_graph = list()
            visualize_graph.append(best_score_index_[0:11])
            for index, sub_comm in enumerate(graph.Partition_Louvain):
                if index != group:
                    sub_random = random.sample(sub_comm, 10)
                    visualize_graph.append(sub_random)

            print(visualize_graph)
            visualize_graph_flatten = [item for sublist in visualize_graph for item in sublist]
            VGraph = nx.Graph()
            for item1 in visualize_graph_flatten:
                for item2 in visualize_graph_flatten:
                    score = graph.Score_Table[int(item1), int(item2)]
                    if score == 0:
                        continue
                    
                    # if score < graph.threshold:
                    VGraph.add_edge(int(item1), int(item2), weight=score)

            cmap = plt.get_cmap("jet")
            pos = nx.spring_layout(VGraph, pos={best_score_index_[0]: (0, 0)}, fixed=[best_score_index_[0]], weight='vis', k=0.05)
            indexed = [graph.Community_Louvain.get(node) for node in VGraph]
            plt.axis("off")
            nx.draw_networkx_nodes(VGraph, pos=pos, cmap=cmap, node_color=indexed, node_size=30, alpha=1)
            nx.draw_networkx_edges(VGraph, pos=pos, alpha=0.2)
            name = '../backend/static/graph_Louvain_' + str(id) + '.png'
            plt.savefig(name)

            res.url = 'http://localhost:9999/static/graph_Louvain_' + str(id) + '.png'
            res.procs.add(name='Visualize', time=(datetime.datetime.now()-start).microseconds)
            start = datetime.datetime.now()
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
    start = datetime.datetime.now()
    graph.BuildGraph()
    Build_Time=(datetime.datetime.now()-start).microseconds
    serve()