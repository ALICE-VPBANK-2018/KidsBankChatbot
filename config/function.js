const tr = require('textrank');
const keyword_extractor = require("keyword-extractor");

exports.summarization = (text) => {
    const textRank = new tr.TextRank(text);
    console.log(textRank.summarizedArticle);
    return(textRank.summarizedArticle);
};

exports.extractKeywords = (text) => {
    const extraction_result = keyword_extractor.extract(text,{
            language:"english",
            remove_digits: true,
            return_changed_case:true,
            remove_duplicates: false
    });
    return extraction_result;
};
