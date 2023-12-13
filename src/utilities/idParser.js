function idParser(identifir, changeCount) {
    let [id, count, price, category] = identifir.split("-");
    count = +count;
    price = price ? +price : undefined;
    if (Number(changeCount)) return { id: id + `-${changeCount}`, count: changeCount };
    else return { id, count, price, category };
}

export default idParser;