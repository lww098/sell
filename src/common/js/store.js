export function saveToLocal(id, key, val) {
    var seller = window.localStorage.__seller__;
    if (!seller) {
        seller = {}
        seller[id] = {}
    } else {
        seller =JSON.parse(seller)
        if (!seller[id]) {
            seller[id] = {}
        }
    }
    seller[id][key] = val
    window.localStorage.__seller__ = JSON.stringify(seller)
}
export function loadFromLocal(id, key, def) {
    var seller = window.localStorage.__seller__
    if (!seller) {
        return def
    }
    seller = JSON.parse(seller)
    if(!seller[id]) {
        return def
    }
    var res = seller[id][key]
    return res || def

}