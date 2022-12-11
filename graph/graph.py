import numpy as np
import pandas as pd
import re
import matplotlib.pyplot as plt
import seaborn as sns


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
    print(dataset_3.iloc[1:3, 4:10].to_numpy())




# if __name__ == "__main__":
#     football_graph = FootballPlayerGraph("parse")
    
#     pass

# def generate_player_data(file_name):


# def BuildGraph():
