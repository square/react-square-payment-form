#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var glob = require("glob")
var reactDocs = require('react-docgen')

var TypeDoc = require('typedoc');
var app = new TypeDoc.Application({
  mode: 'Modules',
  logger: 'none',
  target: 'ES5',
  module: 'CommonJS',
  jsx: true,
  experimentalDecorators: true,
  esModuleInterop: true,
  tsconfig: './tsconfig.json',
});

function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function componentName(filepath) {
  var name = path.basename(filepath);
  var ext;
  while ((ext = path.extname(name))) {
    name = name.substring(0, name.length - ext.length);
  }
  return name;
}

function buildPageMetadata(name) {
  return ['---', 'id:' + name, 'title:' + name, '---'].join('\n');
}

function buildProperties(props) {
  if (props.length === 0) {
    return '';
  }
  return ['## Props', '|Name|Type|Description|Default Value|', '|---|---|---|---|', props.join('\n')].join('\n');
}

function generateMarkdownReactDocs(info) {
  function buildTypeText(flowType) {
    if (flowType.name === 'signature') {
      return '`' + flowType.raw.replace(/[\n\t\r]/g, '') + '`';
    }
    return flowType.raw || flowType.name;
  }
  const props = [];
  if (info.props) {
    for (var [name, details] of Object.entries(info.props)) {
      const columns = [
        name,
        details.flowType ? buildTypeText(details.flowType) : '',
        details.description,
        details.defaultValue ? '`' + details.defaultValue.value.replace(/[\n\t\r]/g, '') + '`' : '',
      ];
      props.push('|' + columns.join('|') + '|');
    }
  }
  return [buildPageMetadata(info.displayName), info.description, buildProperties(props)].join('\n');
}

function generateMarkdownTypedoc(name, info) {
  function buildDescription(comment) {
    if (!comment) {
      return '';
    }
    var text = '';
    if (comment.shortText) {
      text += comment.shortText;
    }
    if (comment.text) {
      if (comment.shortText) {
        text += '\n\n';
      }
      text += comment.text;
    }
    return text;
  }

  function buildCallSignature(type) {
    var signatures = type.declaration ? type.declaration.signatures : null;
    if (!signatures) {
      return;
    }
    var callSignature = signatures.find(function (signature) {
      return signature.kindString === 'Call signature'
    })
    if (!callSignature) {
      return;
    }
    var parameters = [];
    if (callSignature.parameters) {
      parameters = callSignature.parameters.map(function (parameter) {
        var name = parameter.name;
        var type = '';
        if (parameter.type) {
          if (parameter.type.name) {
            type = parameter.type.name;
          } else if (parameter.type.elements) {
            type =
              '[' +
              parameter.type.elements
                .map(function (element) {
                  return element.name;
                })
                .join(', ') +
              ']';
          } else if (parameter.type.type == 'reflection') {
            type = '({}: {}) => {}';
          }
        }
        return name + ': ' + type;
      });
    }

    var response = 'UNKNOWN';
    if (callSignature.type && callSignature.type.name) {
      response = callSignature.type.name;
    }

    return '(' + parameters.join(', ') + ') => ' + response;
  }

  function buildTypeText(type) {
    if (type.name) {
      return type.name;
    }
    if (type.type === 'reflection') {
      return buildCallSignature(type);
    }
    if (type.type === 'union') {
      const reflection = type.types.find(function (elm) {
        return elm.type === 'reflection';
      });
      if (reflection) {
        return buildCallSignature(reflection);
      }
      const instrinsic = type.types.reverse().find(function (elm) {
        return elm.type === 'intrinsic';
      });
      if (instrinsic) {
        return instrinsic.name;
      }
      const values = type.types.map(function (elm) {
        return elm.value;
      });
      return values.join(',');
    }
    return type.type;
  }

  function buildComponentProperties() {
    var defaultValue = '';
    var allProps = info.children.find(function (child) {
      return child.name == 'Props' || child.name == 'ContextInterface';
    });
    if (!allProps) {
      return [];
    }
    return allProps.children.sort(compare).map(function (prop) {
      const columns = [prop.name, buildTypeText(prop.type), buildDescription(prop.comment), defaultValue];
      return '|' + columns.join('|') + '|';
    });
  }

  var descriptionContent = info.children.find(function (child) {
    return child.name == name;
  });
  var props = buildComponentProperties();
  return [
    buildPageMetadata(name),
    descriptionContent ? buildDescription(descriptionContent.comment) : '',
    buildProperties(props),
  ].join('\n');
}

glob('src/components/**/!(*.test).tsx', function (err, files) {
  if (err) throw err;

  files.forEach(function (file) {
    var name = componentName(file);
    if (name === 'models' || name === 'MockContext') {
      return;
    }
    console.log('Generating documentation:', name);
    var markdown;
    try {
      var componentData = fs.readFileSync(file);
      var componentInfo = reactDocs.parse(componentData);
      markdown = generateMarkdownReactDocs(componentInfo);
    } catch (err1) {
      try {
        var tempFileName = 'typedocOutput.json';
        app.generateJson([file], tempFileName);
        var json = JSON.parse(fs.readFileSync(tempFileName));
        var parsed = json.children.find(function (child) {
          return child.originalName == file;
        });
        markdown = generateMarkdownTypedoc(name, parsed);
        fs.unlinkSync(tempFileName);
      } catch (err2) {}
    }
    if (!markdown) {
      console.log('Failed to generate markdown');
      return;
    }
    var outPath = __dirname + '/docs/components/' + name + '.md';
    fs.writeFileSync(outPath, markdown);
  });
});
