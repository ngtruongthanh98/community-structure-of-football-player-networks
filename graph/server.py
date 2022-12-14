from concurrent import futures
from sklearn import cluster
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
        res = exchange_pb2.GraphByPlayerAndAlgoResponse()
        id = request.id
        algo = request.algorithm
        start = datetime.datetime.now()
        if algo == "Louvain" or algo == "KMeans":
            group = graph.Community_Louvain[int(id)]
            comm = graph.Partition_Louvain[group]

            res.procs.add(name='Build Graph', time=graph.Build_Time_Louvain)
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
            visualize_graph.append(best_score_index_[0:31])
            for index, sub_comm in enumerate(graph.Partition_Louvain):
                if index != group:
                    sub_random = random.sample(sub_comm, 30)
                    visualize_graph.append(sub_random)

            print(visualize_graph)
            visualize_graph_flatten = [item for sublist in visualize_graph for item in sublist]
            VGraph = nx.Graph()
            for item1 in visualize_graph_flatten:
                for item2 in visualize_graph_flatten:
                    score = graph.Score_Table[int(item1), int(item2)]
                    if score == 0:
                        continue
                    
                    if score < 4:
                        VGraph.add_edge(int(item1), int(item2), weight=score)

            cmap = plt.get_cmap("jet")
            pos = {node:graph.MapIndex2Pos[node] for node in VGraph}
            print(pos)
            # pos = nx.spring_layout(VGraph, pos={best_score_index_[0]: (0, 0)}, fixed=[best_score_index_[0]], weight='vis', k=0.05)
            # print(pos)
            indexed = [graph.Community_Louvain.get(node) for node in VGraph]
            plt.cla()
            plt.clf()
            plt.axis("off")
            plt.scatter([graph.MapIndex2Pos[int(id)][0]], [graph.MapIndex2Pos[int(id)][1]], c="black", cmap=cmap, s=[100], alpha=1, marker='>', zorder=10)
            # plt.scatter([2], [2], c="black", cmap=cmap, s=[150], marker='x')
            # indexed[0] = 10
            nx.draw_networkx_labels(VGraph,pos,labels={int(id):graph.MapIndex2Name[int(id)]},font_size=10,font_color='r', verticalalignment='bottom')
            nx.draw_networkx_nodes(VGraph, pos=pos, cmap=cmap, node_color=indexed, node_size=50, alpha=0.5)
            print(graph.MapIndex2Pos[int(id)][0])
            
            # nx.draw_networkx_edges(VGraph, pos=pos, alpha=0.2)
            name = '../backend/static/graph_Louvain_' + str(id) + '.png'

            plt.savefig(name, pad_inches=0)

            res.url = 'http://localhost:9999/static/graph_Louvain_' + str(id) + '.png'
            res.procs.add(name='Visualize', time=(datetime.datetime.now()-start).microseconds)
            start = datetime.datetime.now()
        else:
            group = graph.Community_Paris[int(id)]
            comm = graph.Partition_Paris[group]

            res.procs.add(name='Build Graph', time=graph.Build_Time_Paris)
            res.procs.add(name='Find Community', time=(datetime.datetime.now()-start).microseconds)
            start = datetime.datetime.now()

            score_comm = {}
            for node in comm:
                score_comm[node] = graph.Score_Table[int(id), int(node)]
                
            best_score_comm = dict(sorted(score_comm.items(), key=lambda item: item[1]))
            best_score_index_ = list(best_score_comm.keys())

            best_score_index = best_score_index_[1:11]
            print(best_score_index)
            max_score = np.max(list(best_score_comm.values()))
            for player in best_score_index:
                res.similars.add(index=str(player), similar=((float)(max_score - best_score_comm[player]))/max_score)
            
            res.procs.add(name='Get Best Similar', time=(datetime.datetime.now()-start).microseconds)
            start = datetime.datetime.now()

            visualize_graph = list()
            visualize_graph.append(best_score_index_[0:31])
            for index, sub_comm in enumerate(graph.Partition_Paris):
                if index != group:
                    sub_random = random.sample(sub_comm, 30)
                    visualize_graph.append(sub_random)

            visualize_graph_flatten = [item for sublist in visualize_graph for item in sublist]
            VGraph = nx.Graph()
            for item1 in visualize_graph_flatten:
                for item2 in visualize_graph_flatten:
                    score = graph.Score_Table[int(item1), int(item2)]
                    if score == 0:
                        continue
                    
                    if score < 4:
                        VGraph.add_edge(int(item1), int(item2), weight=score)

            cmap = plt.get_cmap("jet")
            pos = {node:graph.MapIndex2Pos[node] for node in VGraph}
            print(pos)
            # pos = nx.spring_layout(VGraph, pos={best_score_index_[0]: (0, 0)}, fixed=[best_score_index_[0]], weight='vis', k=0.05)
            # print(pos)
            indexed = [graph.Community_Paris.get(node) for node in VGraph]
            plt.cla()
            plt.clf()
            plt.axis("off")
            plt.scatter([graph.MapIndex2Pos[int(id)][0]], [graph.MapIndex2Pos[int(id)][1]], c="black", cmap=cmap, s=[100], alpha=1, marker='>', zorder=10)
            # plt.scatter([2], [2], c="black", cmap=cmap, s=[150], marker='x')
            # indexed[0] = 10
            nx.draw_networkx_labels(VGraph,pos,labels={int(id):graph.MapIndex2Name[int(id)]},font_size=10,font_color='r', verticalalignment='bottom')
            nx.draw_networkx_nodes(VGraph, pos=pos, cmap=cmap, node_color=indexed, node_size=50, alpha=0.5)
            print(graph.MapIndex2Pos[int(id)][0])
            
            # nx.draw_networkx_edges(VGraph, pos=pos, alpha=0.2)
            name = '../backend/static/graph_Paris_' + str(id) + '.png'

            plt.savefig(name, pad_inches=0)

            res.url = 'http://localhost:9999/static/graph_Paris_' + str(id) + '.png'
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
    graph.BuildGraph()
    serve()