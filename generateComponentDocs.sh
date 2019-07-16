#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var glob = require("glob")

var TypeDoc = require('typedoc');
var app = new TypeDoc.Application({
  mode:   'Modules',
  logger: 'none',
  target: 'ES5',
  module: 'CommonJS',
  jsx: true,
  experimentalDecorators: true
});

var tempFileName = 'typedocOutput.json'

glob("src/components/**/*.tsx", function (err, files) {
  if (err) throw err;

  files.forEach(function(file, index) {
    var componentData = fs.readFileSync(file)
    if (componentData.indexOf('React.Component') === -1 && componentData.indexOf('React.FunctionComponent') === -1) {
      return
    }
    var name = componentName(file)

    console.log("Generating documentation:", name)
    app.generateJson([file], tempFileName)

    var json = JSON.parse(fs.readFileSync(tempFileName))
    var parsed = json.children.find(function(child) { return child.originalName == file });
    if (!parsed) {
      return
    }
    var markdown = generateMarkdown(name, parsed)
    var outPath = __dirname + '/docs/components/' + name + '.md'
    fs.writeFileSync(outPath, markdown)
  })

  fs.unlinkSync(tempFileName)
})

function componentName(filepath) {
  var name = path.basename(filepath);
  var ext;
  while ((ext = path.extname(name))) {
    name = name.substring(0, name.length - ext.length);
  }
  return name;
}

function pageMetadata(name) {
  return [
    '---',
    'id:' + name,
    'title:' + name,
    '---',
  ].join('\n')
}

function buildDescriptionText(comment) {
  if (!comment) { return ''; }
  var text = '';
  if (comment.shortText) {
    text += comment.shortText;
  }
  if (comment.text) {
    if (comment.shortText) {
      text += '\n\n';
    }
    text += comment.text
  }
  return text
}

function componentDescription(name, data) {
  var content = data.children.find(function(child) {
    return child.name == name
  })
  if (!content) { return '' }
  return buildDescriptionText(content.comment)
}

function buildCallSignature(type) {

  var signatures = type.declaration ? type.declaration.signatures : null
  if (!signatures) { return }

  var callSignature = signatures.find(function(signature) { return signature.kindString === "Call signature" })
  if (!callSignature) { return }


  var parameters = []

  if (callSignature.parameters) {
    parameters = callSignature.parameters.map(function(parameter) {
      var name = parameter.name
      var type = ''

      if (parameter.type) {
        if (parameter.type.name) {
          type = parameter.type.name
        } else if (parameter.type.elements) {
          type = '[' + parameter.type.elements.map(function(element) { return element.name }).join(', ') + ']'
        } else if (parameter.type.type == 'reflection') {
          type = "({}: {}) => {}"
        }
      }
      return name + ': ' + type
    })
  }

  var response = "UNKNOWN"
  if (callSignature.type && callSignature.type.name) {
    response = callSignature.type.name
  }

  return '(' + parameters.join(', ') + ') => ' + response
}

function buildTypeText(type) {
  if (type.name) {
    return type.name
  }
  if (type.type === 'reflection') {
    return buildCallSignature(type)
  }
  return type.type

}

function compare( a, b ) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}



function generateProp(prop, defaultProp) {
  var defaultValue = defaultProp ? defaultProp.defaultValue : ''
  if (defaultValue) {
    defaultValue = defaultValue.replace(/[\n\t\r]/g, '')
    defaultValue = '<br/><br/>**Default Value:** `' + defaultValue + '`'
  }
  const columns = [
    prop.name,
    buildTypeText(prop.type),
    buildDescriptionText(prop.comment) + defaultValue,
  ]
  return '|' + columns.join('|') + '|'
}

function componentProperties(name, data) {
  var props = data.children.find(function(child) {
    return child.kindString == "Interface"
  })
  var defaultProps = data.children.find(function(child) { return child.name == name }) || []
  defaultProps = defaultProps.children ? defaultProps.children.find(function(child) { return child.name == "defaultProps" }) || []  : []
  defaultProps = defaultProps.children || []

  if (!props) { return '' };

  return [
    '## Props',
    '|Name|Type|Description|',
    '|---|---|---|',
    props.children.sort(compare).map(function(prop) {
      var defaultProp = defaultProps.find(function(x) { return x.name == prop.name })
      return generateProp(prop, defaultProp)
    }).join('\n'),
  ].join('\n')
}

function generateMarkdown(name, data) {
  return [
    pageMetadata(name),
    componentDescription(name, data),
    componentProperties(name, data)
  ].join('\n')
}
