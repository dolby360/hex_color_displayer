
const getTotalLenOfRow = (arr) =>{
    let len = 0;
    for(let i of arr){
        len+=i.length;
    }
    return len
}

/**
 * This function takes an array of raw data and an offset object as instructions on how to split the array.
 * The idea of splitting the array is to keep each group within one row, where each row is 16 numbers long.
 * For example, if the offset is [{start: 0, end: 13}, {start: 13, end: 18}] and the row data is [0,1,2,3,...17],
 * the output would be:
 * [
 *   [[0,1,2,3,...,13],[14,15]],
 *   [[16,17]]
 * ]
 *
 * @param {Array} rawData - an array of raw data to be split.
 * @param {Array[Object]} offsets - an array of objects that describe groups of data.
 * @return {Array} - groups of data divided into rows of 16.
 */
export function spllitArray(rawData, offsets){
    let splitt = [];
    let amountOfItems = 0;
    /* The first step is to slice the list of numbers into groups, 
     * without considering the rows. This means that each slice will be the 
     * length of the group, rather than 16 as a row.
    */
    for(let i of offsets){
        splitt.push(rawData.slice(i.start, i.end));
        amountOfItems = i.end;
    }
    let ret = [...Array(Math.ceil(amountOfItems/16))].map(x => []);

    let rowNumber = 0;
    for(let item of splitt){
        //TODO: this can be optimized by on the fly calculation
        let rowLen = getTotalLenOfRow(ret[rowNumber]);  
        if(item.length + rowLen < 16){
            ret[rowNumber].push(item)
            rowLen+=item.length
        }else if(item.length + rowLen === 16){
            ret.push(item);
            rowLen=0;
            rowNumber+=1
        }else{
            while(item.length > 0){
                let fit = item.slice(0, 16 - rowLen);
                item = item.slice(16 - rowLen);
                ret[rowNumber].push(fit);
                
                if(getTotalLenOfRow(ret[rowNumber])==16){
                    rowNumber+=1
                }
                rowLen=0;
            }
        }
    }
    return ret;
}

const addTupleToDict = (dict, key, tuple) => {
    if(Object.hasOwn(dict, key) ){
        dict[key].push(tuple);
    }else{
        dict[key] = [tuple]
    }
}

export function getMap(splited, offsets){
    let offsetInd = 0;
    let len = 0
    let groups = {}
    let lastEnd = 0;
    for (let i = 0; i < splited.length; i++) {
        for (let j = 0; j < splited[i].length; j++) {
            len += splited[i][j].length;
            addTupleToDict(groups, offsetInd, [i, j]);
            if (len + lastEnd >= offsets[offsetInd].end){
                len = 0;
                lastEnd = offsets[offsetInd].end
                offsetInd++;
            }
        }
    }
    return groups;
}
