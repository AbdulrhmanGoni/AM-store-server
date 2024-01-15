function idParser(identifir) {
    let [id, count, price, category] = identifir?.split("-");
    const returnObject = {}
    if (id) returnObject.id = id
    if (count) returnObject.count = +count
    if (price) returnObject.price = +price
    if (category) returnObject.category = category
    return returnObject;
}

export default idParser;