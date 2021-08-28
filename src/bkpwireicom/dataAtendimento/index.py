import os
import glob
import json

path = '.'
extension = 'json'
os.chdir(path)
files = glob.glob('*.{}'.format(extension))
print(files)

# files=['page_1.json','page_2.json']

# print(files);

def mergeManyJsonFiles(file):
  result = list()
  for item in file:
    with open(item, 'r') as infile:
      result.extend(json.load(infile))

  with open('all-history-atendimento.json', 'w') as output_file:
    json.dump(result, output_file)

mergeManyJsonFiles(files)