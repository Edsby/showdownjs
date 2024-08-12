showdown.subParser('makeMarkdown.list', function (node, globals, type) {
  'use strict';

  var txt = '';
  if (!node.hasChildNodes()) {
    return '';
  }
  var listItems       = node.childNodes,
      listItemsLenght = listItems.length,
      listNum = node.getAttribute('start') || 1;

  for (var i = 0; i < listItemsLenght; ++i) {
    let tagName = (listItems[i].tagName || '').toLowerCase();
    if (tagName !== 'li') {
      if (tagName !== '') {
        let subnodeTxt = showdown.subParser('makeMarkdown.node')(listItems[i], globals).trim();
        if (subnodeTxt.length > 0) {
          let parts = subnodeTxt.split('\n');
          for (let lineidx in parts) {
            if (parts[lineidx].trim().length > 0 && parts[lineidx].trim() !== '<!-- -->') {
              parts[lineidx] = `    ${parts[lineidx]}`;
            }
          }
          txt += parts.join('\n') + '\n';
        }
      }
      continue;
    }

    // define the bullet to use in list
    var bullet = '';
    if (type === 'ol') {
      bullet = listNum.toString() + '. ';
    } else {
      bullet = '- ';
    }

    // parse list item
    txt += bullet + showdown.subParser('makeMarkdown.listItem')(listItems[i], globals);
    ++listNum;
  }

  // add comment at the end to prevent consecutive lists to be parsed as one
  txt += '\n<!-- -->\n';
  return txt.trim();
});
