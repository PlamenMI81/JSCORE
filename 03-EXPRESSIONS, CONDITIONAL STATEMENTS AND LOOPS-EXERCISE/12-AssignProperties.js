function assignProp(arr) {
    [key1,value1,key2,value2,key3,value3]=arr;
    // console.log(`{ ${key1}: '${value1}', ${key2}: '${value2}', ${key3}: '${value3}' }`);
    console.log({
        [key1]: value1,
        [key2]: value2,
        [key3]: value3
    });
}

// assignProp(['name', 'Pesho', 'age', '23', 'gender', 'male']);
assignProp(['ssid', '90127461', 'status', 'admin', 'expires', '600']);
