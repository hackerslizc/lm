function returnAddr (str) {
    if(!str) return {};
    var proloc = (str.search('省') !== -1 ? str.search('省')+1 : str.search('自治区')+3) ,
        province = str.substring(0 , proloc),
        city =  str.substring(proloc , str.search('市')+1),
        area = str.substring(str.search('市')+1, str.length);
    return {
        provn: province,
        cityn: city,
        distn: area
    };
}
export {
    returnAddr
};

