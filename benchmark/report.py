import functools
import itertools
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

trial_count = 10
case_list = ['gba', 'gb', 'g']
solution_list = ['js', 'py', 'chiml']
testcase_product = itertools.product(case_list, solution_list)
testcase_list = list(map(lambda x: x[0] + '.' + x[1], testcase_product))


def get_syllable_count(word):
    count = 0
    vowels = 'aeiouy'
    word = word.lower().strip(".:;?!")
    if len(word) > 0 and (word[0] in vowels):
        count += 1
    for index in range(1, len(word)):
        if word[index] in vowels and word[index-1] not in vowels:
            count += 1
    if word.endswith('e'):
        count -= 1
    if word.endswith('le'):
        count += 1
    if count == 0:
        count += 1
    return count


def get_readability(lines, mode):
    lines = [line.strip() for line in lines]
    word_list = ' '.join(lines).split(' ')
    syllable_list = map(lambda word: get_syllable_count(word), word_list)
    t_sentence = float(len([line for line in lines if line != '']))
    t_word = float(len(word_list))
    t_syllable = float(functools.reduce(lambda x, y: x + y, syllable_list))
    if mode == 'fkgl':
        # Flesch Kincaid Grade Level
        return 0.39 * (t_word/t_sentence) + 11.8 * (t_syllable/t_word) - 15.59
    # Flesch Reading Ease
    return 206.835 - 1.015 * (t_word/t_sentence) - 84.6 * (t_syllable/t_word)


def get_fre(lines):
    return get_readability(lines, 'fre')


def get_fkgl(lines):
    return get_readability(lines, 'fkgl')


def get_time(line):
    # strip out \n and s for each line
    line = line.strip('\ns')
    line_parts = line.split('\t')
    time_parts = line_parts[1].split('m')
    minute = float(time_parts[0])
    second = float(time_parts[1])
    return minute * 60 + second


def get_raw_benchmark(lines):
    real = get_time(lines[0])
    user = get_time(lines[1])
    sys = get_time(lines[2])
    return {'real': real, 'user': user, 'sys': sys}


def get_benchmark(raw_benchmarks):
    real, user, sys = 0, 0, 0
    count = len(raw_benchmarks)
    for raw_benchmark in raw_benchmarks:
        real += raw_benchmark['real']
        user += raw_benchmark['user']
        sys += raw_benchmark['sys']
    return {'real': round(real/count, 3),
            'user': round(user/count, 3),
            'sys': round(sys/count, 3)}


def build_testcase_dict(testcase_list, trial_count):
    testcase_dict = {}
    # intrinsic
    for testcase in testcase_list:
        with open(testcase) as f:
            lines = f.readlines()
        size = len(''.join(lines))
        loc = len(lines)
        fre = round(get_fre(lines), 3)
        fkgl = round(get_fkgl(lines), 3)
        testcase_dict[testcase] = {'loc': loc, 'fre': fre, 'size': size,
                                   'fkgl': fkgl, 'raw_benchmarks': []}
    # performance
    for fileIndex in range(trial_count):
        with open(str(fileIndex) + '.txt') as f:
            lines = f.readlines()
        for (i, testcase) in enumerate(testcase_list):
            line_index = i * 5 + 2
            sublines = lines[line_index: line_index + 3]
            raw_benchmark = get_raw_benchmark(sublines)
            testcase_dict[testcase]['raw_benchmarks'].append(raw_benchmark)
    # summarize performance
    for testcase in testcase_list:
        benchmark = get_benchmark(testcase_dict[testcase]['raw_benchmarks'])
        testcase_dict[testcase]['b_user'] = benchmark['user']
        testcase_dict[testcase]['b_real'] = benchmark['real']
        testcase_dict[testcase]['b_sys'] = benchmark['sys']
        del testcase_dict[testcase]['raw_benchmarks']
    return testcase_dict


def build_testcase_df(testcase_list, trial_count):
    testcase_dict = build_testcase_dict(testcase_list, trial_count)
    # initiate data
    data = {'problem': [], 'solution': []}
    for key in testcase_dict[testcase_list[0]]:
        data[key] = []
    # populate the data
    for testcase in testcase_dict:
        for key in testcase_dict[testcase]:
            data[key].append(testcase_dict[testcase][key])
        (problem, solution) = testcase.split('.')
        data['problem'].append(problem)
        data['solution'].append(solution)
    return pd.DataFrame(data)


testcase_df = build_testcase_df(testcase_list, 10)
print(testcase_df)
vars_benchmark = ['b_user', 'b_real', 'b_sys']
vars_readability = ['loc', 'fre', 'fkgl']
markers = ['v', '^', 'o']
# benchmark
gb = sns.pairplot(testcase_df, hue='solution',
                  vars=vars_benchmark, markers=markers)
gb.savefig('benchmark.png')
# readability
gr = sns.pairplot(testcase_df, hue='solution',
                  vars=vars_readability, markers=markers)
gr.savefig('readability.png')
