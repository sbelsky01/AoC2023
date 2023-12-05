def part1(data):
    color_quantities = {'red': 12, 'green': 13, 'blue': 14}
    
    total = 0
    for line in data:
        game_num, game_data = line.split(': ')
        game_list = game_data.replace(';', ',').split(', ')
        colors_map = {'red': 0, 'green': 0, 'blue': 0}
        for entry in game_list:
            [number, color] = entry.split(' ')
            if int(number) > colors_map[color]:
                colors_map[color] = int(number)
        possible = True
        for key, value in color_quantities.items():
            if colors_map[key] > value:
                possible = False
        if possible:
            total += int(game_num.split(' ')[1])

    return str(total)

def part2(data):
    total = 0
    for line in data:
        _, game_data = line.split(': ')
        game_list = game_data.replace(';', ',').split(', ')
        colors_map = {'red': 0, 'green': 0, 'blue': 0}
        for entry in game_list:
            [number, color] = entry.split(' ')
            if int(number) > colors_map[color]:
                colors_map[color] = int(number)
        total += colors_map['red'] * colors_map['green'] * colors_map['blue']
        
    return str(total)
    

def main():
    f = open('input.txt', 'r')
    input_data = f.read().strip().split('\n')

    # Part 1
    result_part1 = part1(input_data)
    print('Part 1: ' + result_part1)

    # Part 2
    result_part2 = part2(input_data)
    print('Part 2: ' + result_part2)

if __name__ == '__main__':
    main()
