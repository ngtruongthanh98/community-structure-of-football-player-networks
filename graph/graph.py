import numpy as np
import pandas as pd
import re
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import dendrogram
import seaborn as sns
import networkx as nx
from louvain import detect_communities, modularity
from paris import paris
from utils import *
from sklearn import cluster
import datetime


personal_info = ['UID', 'Name', 'NationID', 'Born']
goalkeeper_attr = ['AerialAbility', 'CommandOfArea', 'Communication', 'Eccentricity', 'Handling', 'Kicking', 'OneOnOnes', 'Reflexes', 'RushingOut', 
  'TendencyToPunch', 'Throwing']
technical_attr = ['Corners', 'Crossing', 'Dribbling', 'Finishing', 'FirstTouch', 'Freekicks', 'Heading', 'LongShots', 'Longthrows', 'Marking', 
  'Passing', 'PenaltyTaking', 'Tackling', 'Technique']
mental_attr = ['Aggression', 'Anticipation', 'Bravery', 'Composure', 'Concentration', 'Decisions', 'Determination', 'Flair', 'Leadership', 
'OffTheBall', 'Positioning', 'Teamwork', 'Vision', 'Workrate']
physical_attr = ['Acceleration', 'Agility', 'Balance', 'Jumping', 'NaturalFitness', 'Pace', 'Stamina', 'Strength']
hidden_attr = ['Consistency', 'Dirtiness', 'ImportantMatches', 'InjuryProness', 'Versatility', 'Adaptability', 'Ambition', 'Loyalty', 'Pressure',
  'Professional', 'Sportsmanship', 'Temperament', 'Controversy']
foot_atr = ['LeftFoot', 'RightFoot']







MapId2Index = {}
MapIndex2Name = {}
MapIndex2Pos = {}

G_Louvain = nx.Graph()
G_Paris = nx.Graph()

Community_Louvain = {}
Community_Paris = {}

Partition_Louvain_Length = 5
Partition_Louvain = []
Partition_Paris = []


Score_Table = np.empty((1, 1000), int)
threshold = 800
threshold_mo = 3

Build_Time_Louvain = 0
Build_Time_Paris = 0





def position_split(x):
    list_1 = x.split()
    list_2 = list_1[0].split('/')
    if len(list_1) == 1:
        if len(list_2) == 1:
            if list_1[0] == 'S':
                return 'STC'
            return list_1[0]
        return ','.join(list_2)

    result_list = list()
    
    for role in list_2:
        if role == 'S':
            result_list.append('STC')
            continue
        for pos in list_1[1]:
            if role == 'WB' and pos == 'C':
                continue
            result_list.append(role + pos)
    
    return ','.join(result_list)

def split_position(pos):
    pos_set = set()
    try:
        for p in pos:
            try:
                pos_list = p.split(',')
                pos_set = pos_set.union(set(pos_list))
            except:
                print(p)
    except:
        print(pos)
    return pos_set

def extreme_case_for_pos(x):
    x = re.sub('GK,S', 'GK,SK', x)
    x = re.sub('DM,S', 'DM,STC', x)
    x = re.sub('GK[A-Z]', 'GK', x)
    x = re.sub('DM[A-Z]', 'DM', x)
    return x

def randomize_player(dataset):
    idx = np.random.randint(0, dataset.shape[0])
    return dataset.loc[idx, :]

def get_player_main_position(player_data, positions):
    max_familarity = player_data[positions].max()
    return np.array(positions)[(player_data[positions] == max_familarity)]

def get_corr_matrix_for_pos(dataset, pos, familarity=15, mental=True):
    playing_in_pos = dataset[dataset[pos] > familarity].reset_index(drop=True)
    if mental:
        playing_in_pos = playing_in_pos.loc[:, technical_attr + mental_attr + physical_attr]
    else:
        playing_in_pos = playing_in_pos.loc[:, technical_attr + physical_attr]

    return playing_in_pos.corr()

def get_relevant_attr(corr, threshold=0.7):
    relevant_attr_dict = dict()
    for idx, row in corr.iterrows():
        for relevant in row[abs(row) > threshold].index.tolist():
            if relevant == str(idx):
                continue
        
            relevant_attr_dict[frozenset([idx, relevant])] = row[relevant]

    return relevant_attr_dict
  
def get_relevant_group(relevant_attr_dict):
    groups = list() # list of set
    if len(relevant_attr_dict) == 0:
        return list()

    groups.append(set(list(relevant_attr_dict.keys())[0]))
    for key in relevant_attr_dict.keys():
        attrs = list(key)
        for group in groups:
            if attrs[0] in group or attrs[1] in group:
                group.add(attrs[0])
                group.add(attrs[1])
                break
            else:
                groups.append(set(key))

    result = list()
    for group in groups:
        if not group in result:
            duplicate = False
            for old_group in result:
                if group.intersection(old_group) == group:
                    duplicate = True
                    break
                if group.intersection(old_group) == old_group:
                    result.pop(old_group)
            if not duplicate:
                result.append(group)
    return result

def get_player_feature(player, high_corr_group, mental=True, number_of_attribute=7):
    player = player[technical_attr + mental_attr * mental + physical_attr]
    high_corr_dict = dict()
    for group in high_corr_group:
        for attr in list(group):
            high_corr_dict[attr] = list(group)

    result = list()
    out_list = list()
    
    best_attr = player.sort_values(ascending=False).index.tolist()
    
    for attr in best_attr:
        if attr in out_list:
            continue
        if not attr in result:
            result.append(attr)
            if attr in high_corr_dict.keys():
                out_list += high_corr_dict[attr]

    return result[:number_of_attribute]


class FootballPlayerNode():
    def __init__(self, info_line):

        pass



class FootballPlayerGraph():
    def __init__(self, save_mode):
        self.graph_mode = save_mode
        self.node_manager = []
        self.vertical_manager = []
        pass

    def add_node(new_node:FootballPlayerNode):
        pass


    def import_from_file(file_name):
        pass


def InitData():
    global MapId2Index
    global MapIndex2Name
    # dataset is the original data
    dataset = pd.read_csv('../dataset.csv')
    drop_list = dataset[dataset.PositionsDesc.isnull()].index
    # dataset1 contains rows with valid PositionDesc
    dataset_1 = dataset.drop(index = drop_list)
    # dataset2 drops unneccessary columns & reformat 
    dataset_2 = dataset_1.drop(columns=['IntCaps', 'IntGoals', 'U21Caps', 'U21Goals']).reset_index(drop=True)
    positions = dataset_2.columns[-15:].tolist()
    positions = list(map(lambda x: re.sub('Sweeper', 'SK', x), positions))
    positions = list(map(lambda x: re.sub('Striker', 'STC', x), positions))
    positions = list(map(lambda x: re.sub('Goalkeeper', 'GK', x), positions))
    positions = list(map(lambda x: ''.join(re.findall('[A-Z]', x)), positions))
    dataset_2.columns = dataset_2.columns[:-15].tolist() + positions
    dataset_2.columns
    dataset_2.to_csv('../dataset2.csv')
    dataset_2.loc[:, 'Positions'] = dataset_2.PositionsDesc.apply(position_split)
    dataset_2.loc[:, 'Positions'] = dataset_2.Positions.apply(extreme_case_for_pos)

    dataset_3 = dataset_2[dataset_2.PositionsDesc != 'C'].reset_index(drop=True)
    dataset_3.to_csv('../dataset3.csv')

    
    for index, row in dataset_3.iterrows():
        MapId2Index[row[0]] = index
        MapIndex2Name[index] = row[1]
    

    mapDataset = pd.read_csv('../00_Attribute_xy_score.csv')
    mapDataset2 = pd.read_csv('../03_point_xy_visualization.csv')

    # xArray = mapDataset.iloc[0:1000, 5:86].to_numpy()
    # yArray = mapDataset.iloc[0:1000, 86:167].to_numpy()

    # xArray = np.sum(xArray, axis=1)
    # yArray = np.sum(yArray, axis=1)

    # pointArray = [[x, y] for x,y in zip(xArray, yArray)]
    # for index, point in enumerate(pointArray):
    #     MapIndex2Pos[index] = point

    for index, row in mapDataset2.iterrows():
        MapIndex2Pos[index] = [row[4], row[5]]

    

    # print(MapIndex2Pos)

# if __name__ == "__main__":
#     football_graph = FootballPlayerGraph("parse")
    
#     pass

def generate_player_data(file_name):
    global Score_Table
    global threshold
    dataset = pd.read_csv(file_name)
    node_array = dataset.iloc[0:1000, 7:69].to_numpy()
    f_sparse = open('../player_edge_sparse.txt', 'w')
    f_dense = open('../player_edge_dense.txt', 'w')
    
    for (index_source, player_data) in enumerate(node_array):
        diff = node_array - player_data    
        diff_square = diff **2
        score_array = np.sum(diff_square, axis=1)
        # print(score_array.shape)
        Score_Table = np.append(Score_Table, np.array([score_array]), axis=0)
        for (index_dest, edge) in enumerate(score_array):
            if edge == 0:
                continue
            if edge < threshold:
                f_sparse.write("{} {} {}\n".format(index_source, index_dest, edge))
            f_dense.write("{} {} {}\n".format(index_source, index_dest, edge))

    f_sparse.close()
    f_dense.close()
    Score_Table = Score_Table[1:]
    print(Score_Table)
    print(Score_Table.shape)
    print("Done generate player data")

def generate_player_data2(file_name):
    global Score_Table
    global threshold_mo
    dataset = pd.read_csv(file_name)
    f_sparse = open('../player_edge_sparse.txt', 'w')
    f_dense = open('../player_edge_dense.txt', 'w')
    
    # for (index_source, player_data) in dataset.iterrows():
    #     print(player_data[2:7])
    #     break
    weight_flatten = [player_data[7] for _, player_data in dataset.iterrows()]
    Score_Table = [weight_flatten[1000 * k:1000 * k + 1000] for k in range(1000)]
    Score_Table =np.array(Score_Table)
    
    for (index_source, player_data) in enumerate(Score_Table):
        for (index_dest, edge) in enumerate(player_data):
            if edge == 0:
                continue
            if edge < threshold_mo:
                f_sparse.write("{} {} {}\n".format(index_source, index_dest, edge))
            f_dense.write("{} {} {}\n".format(index_source, index_dest, edge))

    f_sparse.close()
    f_dense.close()
    
    # print(Score_Table)
    print(Score_Table.shape)
    print("Done generate player data")


def read_data_to_graph(graph:nx.Graph):
    file_name = '../player_edge_sparse.txt'
    # file_name = '../player_edge_dense.txt'
    with open(file_name, "r") as f:
        for line in f:
            if line[0] == "#":
                continue
            N_source, N_dest, weight = line.split()
            N_source = int(N_source)
            N_dest = int(N_dest)
            weight = float(weight)
            graph.add_edge(N_source, N_dest, weight=weight, vis=(1/weight))




def build_louvain_graph():
    global G_Louvain
    global Community_Louvain
    global Partition_Louvain
    global Partition_Louvain_Length
    read_data_to_graph(G_Louvain)
    Partition_Louvain = detect_communities(G_Louvain, randomized=True)
    
    # print(Partition_Louvain)
    print(len(Partition_Louvain))
    Partition_Louvain_Length = len(Partition_Louvain)
    print("Modularity for best partition:", modularity(G_Louvain, Partition_Louvain))

    for community, nodes in enumerate(Partition_Louvain):
        for node in nodes:
            # print(community, node)
            Community_Louvain[node] = community

    # print(Community_Louvain)
    
    # cmap = plt.get_cmap("jet")
    # A = nx.Graph()
    # A.add_edge(1,2,weight=5)
    # A.add_edge(1,3,weight=4)
    # A.add_edge(2,3,weight=3)
    # A.add_edge(1,4,weight=2)

    # parts = detect_communities(A, randomized=True)
    # print(parts)
    # pos = nx.spring_layout(A, weight='weight', k=0.12)
    # pos1 = nx.graphviz
    # # indexed = [Community_Louvain.get(node) for node in G_Louvain]
    # # print(indexed)
    # print([node for node in A])
    # plt.axis("off")
    # # print("huh")
    # nx.draw_networkx_nodes(A, pos=pos, cmap=cmap, node_color=[0,1,1,0] , node_size=20, alpha=1)
    # nx.draw_networkx_edges(A, pos=pos, alpha=0.2)
    # plt.show()    


def build_paris_graph():
    global G_Paris
    global Community_Paris
    global Partition_Louvain_Length
    read_data_to_graph(G_Paris)
    res = cluster.AgglomerativeClustering(n_clusters=Partition_Louvain_Length).fit(np.array(list(MapIndex2Pos.values())))
    for index, group in enumerate(res.labels_):
        Community_Paris[index] = group
    
    for i in range(Partition_Louvain_Length):
        Partition_Paris.append([k for k, v in Community_Paris.items() if v == i])

    print(Partition_Paris)
    # print(Community_Paris)
    # plot_dendrogram2(res, truncate_mode='level', p=10)
    # pos = nx.spring_layout(G_Paris)
    # plot_best_clusterings(G_Paris, a, 2, pos)



def BuildGraph():
    global Build_Time_Louvain
    global Build_Time_Paris
    # generate_player_data('../dataset3.csv')
    generate_player_data2('../02_1000_player_score.csv')
    start = datetime.datetime.now()
    build_louvain_graph()
    Build_Time_Louvain=(datetime.datetime.now()-start).microseconds
    start = datetime.datetime.now()
    build_paris_graph()
    Build_Time_Paris=(datetime.datetime.now()-start).microseconds
