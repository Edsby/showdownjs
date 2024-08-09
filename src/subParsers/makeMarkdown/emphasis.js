showdown.subParser('makeMarkdown.emphasis', function (node, options, globals) {
  'use strict';
  const delimiter = '_';

  let txt = '';
  if (node.hasChildNodes()) {
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], options, globals);
    }
    txt = txt.replaceAll('\n\n', '\n');
    if (txt.endsWith('\n')) {
      txt = txt.substr(0, txt.length - 1);
    }
  }
  let startsWithSpace = txt.startsWith(' ');
  let endsWithSpace = txt.endsWith(' ');
  let trimmedText = txt.trim();
  if (trimmedText.length === 0) {
    if (startsWithSpace || endsWithSpace) {
      return ' ';
    } else {
      return '';
    }
  } else {
    return `${delimiter}${startsWithSpace ? '&nbsp;' : ''}${trimmedText}${endsWithSpace ? '&nbsp;' : ''}${delimiter}`;
  }
});
