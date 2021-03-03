/**
 * Created by Administrator on 2019/1/23.
 */

/**
 * 将json串转换成树形结构
 * @param a 树dataList
 * @param idStr 树节点id string 'id'
 * @param pidStr 树parentId string '树parentId'
 * @param chindrenStr children string 'children'
 * @returns {Array}
 */
function transData(a, idStr, pidStr, chindrenStr, extraParameter) {
    let r = [],
        hash = {},
        id = idStr,
        pid = pidStr,
        children = chindrenStr,
        i = 0,
        j = 0,
        len = a.length;
    for (; i < len; i++) {
        hash[a[i][id]] = a[i];
    }
    for (; j < len; j++) {
        let aVal = a[j],
            hashVP = hash[aVal[pid]];
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
        } else {
            r.push(aVal);
        }
        //            查找已部署节点id集
        if (extraParameter && aVal.state == '1') extraParameter.push(aVal.id)

    }
    return r;
}

export default {
    transData,
}