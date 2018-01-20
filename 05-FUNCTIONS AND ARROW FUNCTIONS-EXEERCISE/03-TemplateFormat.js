function templateFormat(strArr) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n';
    for (let i = 0; i < strArr.length; i += 2) {
        let question = strArr[i];
        let answer = strArr[i + 1];
        // xml+=`  <question>\n\t${question}\n</question>\n<answer>\n\t${answer}\n</answer>\n`;
        xml += `  <question>
    ${question}
  </question>
  <answer>
    ${answer}
  </answer>\n`;

    }
    xml += "</quiz>";
    return xml;
}

console.log(templateFormat(["Dry ice is a frozen form of which gas?",
    "Carbon Dioxide",
    "What is the brightest star in the night sky?",
    "Sirius"]
));