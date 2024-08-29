showdown.subParser('makeMarkdown.details', function (node, options, globals) {
  'use strict';
  const openingPrefix = '??? ', lineIndent = '    ';

  var txt = '';
  if (node.hasChildNodes()) {
    let summaryContent = false;
    let contentLines = [];
    let children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      let childNode = children[i];
      if (childNode.nodeType === 3 || children[i].tagName.toLowerCase() !== 'summary') {
        let contentLinesSplit = showdown.subParser('makeMarkdown.node')(childNode, options, globals).split('\n');
        for (let lineIdx in contentLinesSplit) {
          contentLines.push(`${lineIndent}${contentLinesSplit[lineIdx]}`);
        }
      } else if (children[i].tagName.toLowerCase() === 'summary') {
        summaryContent = showdown.subParser('makeMarkdown.paragraph')(childNode, options, globals).trim();
      }
    }
    return [`${openingPrefix}"${summaryContent.replaceAll('\"', '&quot;')}"`, ...contentLines].join('\n') + '\n';
  }

  // some text normalization
  txt = txt.trim() + '\n\n';

  return txt;
});
