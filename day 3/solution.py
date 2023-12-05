import copy

def remove_num(data, row, col):
    data[row]=data[row][:col]+'.'+data[row][col+1:]
    
def left_string(data, row, col):
    if col<0:
        return ''
    char = data[row][col]
    if not char.isnumeric():
        return ''
    remove_num(data, row, col)
    return left_string(data, row, col-1)+char

def right_string(data, row, col):
    if col>=len(data[row]):
        return ''
    char = data[row][col]
    if not char.isnumeric():
        return ''
    remove_num(data, row, col)
    return char+right_string(data, row, col+1)
                

def find_adj_nums(data, symbol_row, symbol_col):
    adj_nums_find = []
    for x in range(-1, 2):
        for y in range(-1, 2):
            if x==y==0:
                continue
            row = symbol_row + x
            col = symbol_col + y
            if row<0 or col<0:
                continue
            char = data[row][col]
            if char.isnumeric():
                adj_nums_find.append(left_string(data, row, col-1)+
                                char+right_string(data, row, col+1))
                remove_num(data, row, col)
    return adj_nums_find

def part1(data1):
    data = copy.deepcopy(data1)
    exclude = '.0123456789'
    total = 0
    for row in range(len(data)):
        for col in range(len(data)):
            if data[row][col] not in exclude:
                adj_nums_main = find_adj_nums(data, row, col)
                for number in adj_nums_main:
                    total += int(number)
            
    return total

def part2(data2):
    data = copy.deepcopy(data2)
    total = 0
    for row in range(len(data)):
        for col in range(len(data)):
            if data[row][col] == '*':
                adj_nums_main = find_adj_nums(data, row, col)
                if len(adj_nums_main) == 2:
                    total += int(adj_nums_main[0])*int(adj_nums_main[1])
            
    return total

def main():
    f = open('input.txt', 'r')
    input_data = f.read().strip().split('\n')

    # Part 1
    result_part1 = part1(input_data)
    print('Part 1: ' + str(result_part1))

    # Part 2
    result_part2 = part2(input_data)
    print('Part 2: ' + str(result_part2))

if __name__ == '__main__':
    main()
