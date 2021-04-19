import json

C_SUGGESTIONS_FILE = "portfolio/config/suggestions.json"


def load_suggestions():
    global suggestions 
    global thresholds 
    with open(C_SUGGESTIONS_FILE, "r") as f:
        data = f.read()
        suggestions = json.loads(data)

        #converting score to integer as json does not allow number keys
        copy = {}
        for s_type in suggestions.keys():
            copy[s_type] = {}
            for threshold in suggestions[s_type]:
                copy[s_type][int(threshold)] = suggestions[s_type][threshold]
        suggestions = copy

        thresholds = {}
        for s_type in suggestions.keys():
            thresholds[s_type] = [x for x in suggestions[s_type].keys()]
            thresholds[s_type].sort()

def get_suggestions(s_type, score):
    try:
        for threshold in thresholds[s_type]:
            if threshold >= score:
                return suggestions[s_type][threshold]
    except Exception as e:
        print("LOG: ERROR: could not process suggestion {} with score {}".format(s_type, score))
    return ""
